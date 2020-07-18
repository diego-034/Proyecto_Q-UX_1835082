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
  loading: boolean;
  error: boolean;
  noFound: boolean;

  constructor(private ProductsService: ProductsService,
              private router:Router ) {

    this.loading = true;
    this.error = false;
    this.noFound = false;

    try {
      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          if(data.data.length === 0) {
            this.noFound = true;
          }
          this.products = data.data;
          this.loading = false;
        }, () => {
          this.error = true;
          this.loading = false;
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
