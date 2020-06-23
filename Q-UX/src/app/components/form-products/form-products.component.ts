import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

//Importamos el servicio
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {  
  
  @Input() response  = null

  constructor(private ProductsService: ProductsService, private Router: Router) {
   
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
  })

  ngOnInit(): void {
    this.validacion()
  }

  validacion(){
    if(this.response != null){
      this.formProducts.setValue(this.response[0])
     }
  }

  //Metodo que llama al addProduct del Servicio Products
  addProduct() {
    try {

      var response = this.ProductsService.addProducts(this.formProducts.value)
      response.subscribe((data: any) => {
        console.log(data)
        if (!data.success) {
          alert("No se pudo agregar el producto")
          return
        } else {
          alert("Producto agregado exitosamente")
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
          alert("No se pudo actualizar")
          return
        } else {
          alert("Producto actualizado exitosamente")
          this.Router.navigate(['/admin/home']);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
