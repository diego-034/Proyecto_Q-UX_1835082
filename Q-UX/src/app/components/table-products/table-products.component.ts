import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css']
})
export class TableProductsComponent implements OnInit {

  @Output() product: EventEmitter<any>;

  index = -1
  products: any[] = [];

  constructor(private ProductsService: ProductsService) {
    try {

      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          this.products = data.data;
        })
        this.product = new EventEmitter<any>()
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit() {
  }

  deleteProduct(value, count) {
    try {

      if (!this.ProductsService.deleteProducts(value)) {
        alert("Ocurrio un error")
        return
      }
      this.products.splice(count, 1)

    } catch (error) {
      console.log(error)
    }
  }

  updateProduct(value, count) {
    try {
      this.ProductsService.updateProducts(value)
        .subscribe((data: any) => {
          // if (!data.data) {
          //   alert("Ocurrio un error")
          //   return
          // }
          this.product.emit(data.data)
        })
        // this.product.subscribe(
        //   res => {
        //     console.log(res);
  
        //   }
        // );
    } catch (error) {
      console.log(error)
    }
  }
}
