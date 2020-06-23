import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: any[] = [];
  id:number;

  constructor(private ProductsService: ProductsService,
              private router:Router ) {
    try {
      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          this.products = data.data;
          console.log( this.products);
        })
    } catch (error) {
      console.log(error)
    }
  }
  
  ngOnInit(): void {
  }

  verProducto() {
    this.router.navigate( ['/seeProduct', this.id] )
  }

}
