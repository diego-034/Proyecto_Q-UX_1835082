import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { FormProductsComponent } from '../../../components/form-products/form-products.component';
import { TableProductsComponent } from '../../../components/table-products/table-products.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  productChild

  value = false
  constructor() {

  }

  ngOnInit() {

  }

  mostrar(event) {
    try {

      this.productChild = event

      this.validateActivate(true)
    } catch (error) {
      console.log(error)
    }
  }

  validateActivate(value = null) {
    try {

      if (value != null) {
        this.value = value
      }

      return this.value
    } catch (error) {
      console.log(error)
    }
  }
}
