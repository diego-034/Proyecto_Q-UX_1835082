import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductsService } from '../../services/products/products.service';


@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  product: any = {};
  nombre:string;
  id: any;

  constructor(private activatedRoute: ActivatedRoute,
              private productsService: ProductsService) {
    
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.id = params.id
      // console.log(this.id);
      try {
        this.productsService.getProducts()
          .subscribe((data: any) => {
            this.product = data.data[this.id];
            console.log( this.product );
          })
      } catch (error) {
        console.log(error)
      }
    })

  }
}
