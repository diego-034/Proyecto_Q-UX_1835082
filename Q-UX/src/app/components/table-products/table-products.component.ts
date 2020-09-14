import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';
import { domainToASCII } from 'url';

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
      // llamamos al servidor para hacer una peticion a la api para mostrar los productos en la base de datos
      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          this.products = data.data; // Lo que trae se lo asignamos a la variable products que es un array
        })
        this.product = new EventEmitter<any>() // Con este traemos la vista de la tabla donde estan mostrandose los productos
    } catch (error) {
      console.log(error)
    }
  }

  ngOnInit() {
  }

  // Borramos productos, obtenemos en el value el id, y en el count la posición en el array
  deleteProduct(value:number, count:number) {

    if(confirm("¿Eliminar Producto?")) {
      try {
        // enviamos el id al servicio ProductsService llamando la funcion de borrado y resivimos la respuesta en el .subscribe
        this.ProductsService.deleteProducts(value)
        .subscribe((data: any) => {
          if(!data.success) { // Si no se borra aquí resivimos el error
            Swal.fire({
              allowOutsideClick: false,
              icon:'error',
              text: data.message
            });
            return
          }
          // en caso de que sea eliminado lo borramos del array
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

  selectProduct(value:number, count) { 
    try {
      this.ProductsService.selectProduct(value)
        .subscribe((data: any) => {
          console.log(data);
          this.product.emit(data.data) // Aquí enviamos la información a otro componente (la enviamos a form-products, para que allí se pueda obtener el producto)
        })
    } catch (error) {
      console.log(error)
    }
  }
}
