import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor() { }

  ngOnInit(): void {
    
  }

  peticion(){
    let url = "http://127.0.0.1:8000/api/producto"
    fetch(url, {
      method: 'GET'
  })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {}
      );
  }
}
