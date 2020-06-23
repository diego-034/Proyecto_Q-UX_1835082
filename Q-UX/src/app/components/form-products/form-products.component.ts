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
    Nombre: new FormControl(),
    Imagen: new FormControl(),
    Descripcion: new FormControl(),
    Color: new FormControl(),
    Precio: new FormControl(),
    IVA: new FormControl(),
    Descuento: new FormControl(),
    TallaS: new FormControl(),
    TallaM: new FormControl(),
    TallaL: new FormControl()
  })

  ngOnInit(): void {
    if(this.response != null){
      console.log(this.response)
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
}
