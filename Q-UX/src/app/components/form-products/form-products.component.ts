import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Servicios
import { ProductsService } from 'src/app/services/products/products.service';
import { ValidadoresService } from '../../services/validadores.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {  
  
  @Input() response  = null // traemos los datos de un componente padre y los guardamos en response, si no hay nada se iguala a null

  constructor(private ProductsService: ProductsService,
             private Router: Router,
             private validadores: ValidadoresService) {
    
    // Verificamos que el usuario haya iniciado sesión previamente antes de mostrar la vista correspondiente a esta sección, si no ha iniciado sesión es redirigido al inicio de sesión
    if(!sessionStorage.getItem('Token-TKN')) {
        this.Router.navigate(['/login']);
        return;
    }

  }

  ngOnInit(): void {
    this.actualizacion()
  }

  // esto es un getter en una clase, es una forma de obtener una propiedad, lo que hace es prosesar la información, con esto obtenemos los valores de las cajas de texto y validamos que todo sea correcto en el formulario.
  get nombreNoValido() { 
    return this.formProducts.get('Nombre').invalid && this.formProducts.get('Nombre').touched;
  }
  get descripcionNoValido() {
    return this.formProducts.get('Descripcion').invalid && this.formProducts.get('Descripcion').touched;
  }
  get colorNoValido() {
    return this.formProducts.get('Color').invalid && this.formProducts.get('Color').touched;
  }
  get precioNoValido() {
    return this.formProducts.get('Precio').invalid && this.formProducts.get('Precio').touched;
  }
  get ivaNoValido() {
    return this.formProducts.get('IVA').invalid && this.formProducts.get('IVA').touched;
  }
  get descuentoNoValido() {
    return this.formProducts.get('Descuento').invalid && this.formProducts.get('Descuento').touched;
  }
  get tallaSNoValido() {
    return this.formProducts.get('TallaS').invalid && this.formProducts.get('TallaS').touched;
  }
  get tallaMNoValido() {
    return this.formProducts.get('TallaM').invalid && this.formProducts.get('TallaM').touched;
  }
  get tallaLNoValido() {
    return this.formProducts.get('TallaL').invalid && this.formProducts.get('TallaL').touched;
  }

  // guardamos todos los datos a ser enviados y los validamos 
  formProducts = new FormGroup({
    IdProducto  : new FormControl(),
    Nombre      : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(2), this.validadores.espacioBlanco ]),
    // Imagen   : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espacioBlanco ]),
    Descripcion : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espacioBlanco ]),
    Color       : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(2), this.validadores.espacioBlanco ]),
    Precio      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espacioBlanco ]),
    IVA         : new FormControl(),
    Descuento   : new FormControl('', [ Validators.pattern("^[0-9]*$") ]),
    TallaS      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espacioBlanco ]),
    TallaM      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espacioBlanco ]),
    TallaL      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espacioBlanco ]),
    Estado      : new FormControl()
  });

  // Setea los input con el valor correspondiente para poder actualizar el producto 
  actualizacion(){
    if(this.response != null) {
      this.formProducts.setValue(this.response[0]); // en response[0] tenemos los valores que vamos a declarar a los input para actualizar
    }
  }

  //Método para agregar productos
  addProduct() {
    /* Validación del formulario de productos, si alguna caja de texto no esta correctamente diligenciada se tornara de color rojo el borde de la caja de texto*/  
    if(this.formProducts.invalid) {
      return Object.values(this.formProducts.controls).forEach(control => {

        if( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        }else {
          control.markAsTouched();
        }

      });
    }

    console.log(this.formProducts);
     /* Validamos el formulario, si algo es incorrecto se tornara el borde de la caja de texto con color rojo*/  
     if(this.formProducts.invalid) { // verificamos si es invalido
      return Object.values(this.formProducts.controls).forEach(control => {

        if( control instanceof FormGroup ) {
          // Los marcamos como si los hubiera tocado el usuario para poner el color rojo al borde del input, en el caso que le de al boton de añadir sin llenar campos
          Object.values(control.controls).forEach( control => control.markAsTouched() ); 
        }else {
          control.markAsTouched();
        }

      });
    }

    try {
      // Enviamos los datos a  ProductsService en la funcion addProducts para hacer la peticion a la api y resivimos la respuesta en el .subscribe
      var response = this.ProductsService.addProducts(this.formProducts.value)
      response.subscribe((data: any) => {
        if (!data.success) {
          Swal.fire({
            icon:'error',
            title: "Error!!!",
            text: data.message
          });
          return
        } else {
          Swal.fire({
            icon: "success",
            title: "Correcto",
            text: data.message
          })
          this.Router.navigate(['/admin/home']);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Actualizar productos
  updateProduct() {
     /* Validación del formulario de productos, si alguna caja de texto no esta correctamente diligenciada se tornara de color rojo el borde de la caja de texto*/  
    if(this.formProducts.invalid) {
      return Object.values(this.formProducts.controls).forEach(control => {

        if( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        }else {
          control.markAsTouched();
        }

      });
    }

    try {
      /*Enviamos al servicio  ProductsService en la funcion updateProducts los datos de los productos a actualizar para hacer la peticion a la api y resivimos la respuesta en el .subscribe*/
      var response = this.ProductsService.updateProducts(this.formProducts.get('IdProducto').value, this.formProducts.value)
      response.subscribe((data: any) => {
        if (data.success) {
          Swal.fire({
            icon: "success",
            title: "Correcto",
            text: data.message
          })
          this.Router.navigate(['/admin/home']);
        }
      }, err => {
        Swal.fire({
          icon: "error",
          title: "Error!!",
          text: err.error.error
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
