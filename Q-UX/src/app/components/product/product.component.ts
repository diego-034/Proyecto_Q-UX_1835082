import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private productsService:ProductsService) { }

  ngOnInit(): void {
    
  }
  cargarProductos(){
    console.log(this.productsService.getProducts());
  }
}
