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
  
  @Input() response  = null

  constructor(private ProductsService: ProductsService,
             private Router: Router,
             private validadores: ValidadoresService) {

    if(!sessionStorage.getItem('Token-TKN')) {
        this.Router.navigate(['/login']);
        return;
    }

  }

  ngOnInit(): void {
    this.actualizacion()
  }

  // esto es un getter en una clase, es una forma de obtener una propiedad, lo que hace es prosesar la información.
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
    Nombre      : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    // Imagen   : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    Descripcion : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    Color       : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    Precio      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    IVA         : new FormControl(),
    Descuento   : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
    TallaS      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    TallaM      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    TallaL      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    Estado      : new FormControl()
  });

  // Setea los input con el valor correspondiente para poder actualizar el producto 
  actualizacion(){
    if(this.response != null) {
      console.log(this.response);
      this.formProducts.setValue(this.response[0]);
    }
  }

  //Método para agregar productos
  addProduct() {

    console.log(this.formProducts);
     /* Para la validacion del formulario, si hay algo mal se marcara con rojo*/  
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

      var response = this.ProductsService.addProducts(this.formProducts.value)
      response.subscribe((data: any) => {
        if (!data.success) { // Hay que organizar
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
    try {
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
