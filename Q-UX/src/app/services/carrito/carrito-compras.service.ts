import { Injectable } from '@angular/core';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

@Injectable({
  providedIn: 'root'
})
export class CarritoComprasService {

  cantidad: number;
  array: string[] = [];
  paso: boolean = true;

  constructor() { }

  set(data:any) {
    try {

      var flag: boolean = true;
      var count: number = 0;
      this.paso = true;

      while(flag){

        if(localStorage.getItem('producto_'+count)){
          count++;
        }else {
          data.key = 'producto_'+count;
          localStorage.setItem('producto_'+count, JSON.stringify(data) );
          count++;
          localStorage.setItem('cantidad', count.toString());

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Añadido al Carrito'
          })
          flag = false;
        }

      }

    } catch (error) {
      console.error(error);
    }
  }

  get() {
    try {

      if(this.paso) {
        var count = localStorage.getItem('cantidad');
        this.cantidad = parseInt(count);
  
        if(this.cantidad === 0 ) {
          this.array = [];
        } else {
          for (let i  = 0; i < this.cantidad; i++){
            let variable = JSON.parse( localStorage.getItem('producto_'+i) );
            
            if(variable !== null) {
              this.array.push( variable );
            } 
          }
        }
      }
      return this.array;

    } catch (error) {
      console.error(error);
    }
  }

  remove(key:string, cantidadRestante:number, posicion:number) {


    localStorage.removeItem(key); // borrar del LocalStorage
    this.array.splice(posicion, 1); // Borramos la posicion

    let cantidadRes = cantidadRestante.toString();
    this.cantidad = parseInt(cantidadRes); //Actulizamos la cantidad restante

    localStorage.setItem('cantidad', this.cantidad.toString());
    if(parseInt(cantidadRes) < 1) {
      localStorage.removeItem('cantidad');
    }

    this.paso = false; 
  }
}
