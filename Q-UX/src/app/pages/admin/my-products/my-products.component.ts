import { Component, OnInit, ViewChild } from '@angular/core';

import { FormProductsComponent } from '../../../components/form-products/form-products.component';
import { TableProductsComponent } from '../../../components/table-products/table-products.component';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  @ViewChild('child1') childOne: TableProductsComponent;
  @ViewChild('child2') childTwo: FormProductsComponent;

  value = false
  constructor() { }

  ngOnInit() {

  }

  mostrar() {
    this.childOne.emitEvent.subscribe(
      res => {
        console.log("Atributo:" + res);

      }
    );
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
