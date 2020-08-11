import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

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

  deleteProduct(value:number, count:number) {

    if(confirm("¿Eliminar Producto?")) {
      try {
        this.ProductsService.deleteProducts(value)
        .subscribe((data: any) => {
          if(!data.success) {
            Swal.fire({
              allowOutsideClick: false,
              icon:'error',
              text: data.message
            });
            return
          }
          this.products.splice(count, 1)
          Swal.fire({
            allowOutsideClick: false,
            icon:'success',
            text: data.message
          });
        }, (err:any) => {
          Swal.fire({
            allowOutsideClick: false,
            icon:'error',
            text: err.error
          });
        });

      } catch (error) {
        console.log(error)
      }
    }

  }

  selectProduct(value:number) {
    try {
      this.ProductsService.selectProduct(value)
        .subscribe((data: any) => {
          console.log(data);
          this.product.emit(data.data)
        })
    } catch (error) {
      console.log(error)
    }
  }
}
