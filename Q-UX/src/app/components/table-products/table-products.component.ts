import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

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

}
