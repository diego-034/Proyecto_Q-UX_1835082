import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//Importamos el servicio
import { ProductsService } from 'src/app/services/products/products.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {  
  
  @Input() response  = null

  constructor(private ProductsService: ProductsService, private Router: Router) {

    if(!sessionStorage.getItem('Token-TKN')) {
        this.Router.navigate(['/login']);
        return;
    }

  }

  ngOnInit(): void {
    this.validacion()
  }

  formProducts = new FormGroup({
    IdProducto: new FormControl(),
    Nombre: new FormControl(),
    //Imagen: new FormControl(),
    Descripcion: new FormControl(),
    Color: new FormControl(),
    Precio: new FormControl(),
    IVA: new FormControl(),
    Descuento: new FormControl(0),
    TallaS: new FormControl(0),
    TallaM: new FormControl(0),
    TallaL: new FormControl(0),
    Estado: new FormControl()
  });

  validacion(){
    if(this.response != null){
      this.formProducts.setValue(this.response[0]);
     }
  }

  //Metodo que llama al addProduct del Servicio Products
  addProduct() {
    try {

      var response = this.ProductsService.addProducts(this.formProducts.value)
      response.subscribe((data: any) => {
        console.log(data)
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

  updateProduct() {
    try {
      var response = this.ProductsService.updateProducts(this.formProducts.get('IdProducto').value,this.formProducts.value)
      response.subscribe((data: any) => {
        console.log(data)
        if (!data.success) {
          alert("No se pudo actualizar") // Hay que organizar
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
}
