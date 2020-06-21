import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  value = false
  constructor() { }

  ngOnInit(): void {
  }

  validateLogin(value = null) {
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
