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

    this.activatedRoute.params.subscribe( data => { // Para escuchar los cambios o lo que vine en  los parametros usamos el .subscribe
      // console.log(data["i"]); // el id es que nos trae el data de lo que escucho el subscribe
      // this.heroe = this._heroesService.getHeroe(data['id'])
      // console.log(this.heroe);
      console.log("Desde el constructor")
    } );

    
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
            // console.log( this.product.Descripcion ) 
          })
      } catch (error) {
        console.log(error)
      }
      // console.log(this.product)
      console.log("desde el ngOnInit ");
    })

  }
}
