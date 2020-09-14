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
    // Leemos el localStorage por medio del método get que tenemos en el Servicio carritoComprasService.
    let productos = this.carritoComprasService.get();
    // Obtenemos la cantidad de productos para saber si hay algo o no
    let localCantidad = localStorage.getItem('cantidad');
    let cantidad = parseInt(localCantidad);

    if(localCantidad !== null && cantidad !== 0) { // Si hay algún número en la cantidad esta parte se hace
      this.cantidad = productos.length; // La cantidad es igual a la cantidad de productos
      this.productos = productos; // Llenamos la variable global productos con los productos obtenidos del servicio de carrito de compras
      // console.log(this.cantidad);
      return;
    }
    this.productos = []; // Con esto reseteamos la variable que guarda los productos
    // console.log("Esta parte se esta haciendo");
  }

  // Esta funcion es para cuando el usuario elimina un producto, Tomamos la key del producto y tambien la posición en el array
  remove(producto:string, i: number) {
    this.cantidad = this.cantidad - 1;   // Tomamos la cantidad de productos que tenemos y le restamos uno.
    this.carritoComprasService.remove(producto, this.cantidad, i); // Enviamos la informacion a la función remove de carritoComprasService
  }


}
