import { Component, OnInit } from '@angular/core';

import { CarritoComprasService } from '../../services/carrito/carrito-compras.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit {

  productos: any[] = [];
  precio   : number;
  cantidad : number;

  constructor(private carritoComprasService: CarritoComprasService) { }

  ngOnInit(): void {
    this.readLocalStorage();
  }

  readLocalStorage() {
    
    let productos = this.carritoComprasService.get();
    // console.log(productos);
    
    let localCantidad = localStorage.getItem('cantidad');
    let cantidad = parseInt(localCantidad);

    if(localCantidad !== null && cantidad !== 0) {
      this.cantidad = productos.length;
      this.productos = productos;
      console.log(this.cantidad);
      return;
    }
    this.productos = [];
    // console.log("Esta parte se esta haciendo");
  }

  remove(producto:string, i: number) {
    this.cantidad = this.cantidad - 1;  
    this.carritoComprasService.remove(producto, this.cantidad, i); 
  }


}
