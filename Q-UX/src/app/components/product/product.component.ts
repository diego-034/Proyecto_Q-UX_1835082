import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: any[] = [];

  constructor(private ProductsService: ProductsService) {
    try {
      
      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          this.products = data.data;
        })
    } catch (error) {
      console.log(error)
    }
  }
  
  ngOnInit(): void {
  }

  addCart(idx:number) {
    alert("Añadido Correctamente");
  }
}
