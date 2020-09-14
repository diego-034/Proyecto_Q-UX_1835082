import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  products: any[] = []; // aquí guardamos los productos que traemos de la api, para luego mostrarlos en la parte del HTML
  id:number;
  loading: boolean;
  error: boolean;
  noFound: boolean;

  constructor(private ProductsService: ProductsService,
              private router:Router ) {

    this.loading = true; // para mostar el componenente de carga
    this.error = false; // para mostar el componenente de error
    this.noFound = false; // para mostar la etiqueta HTML que nos dice si no hay productos

    try {
      // Llamamos el servicio para obtener los productos desde la api, y leemos la respuesta en el .subscribe
      this.ProductsService.getProducts()
        .subscribe((data: any) => {
          if(data.data.length === 0) {
            // Esta parte se ejecuta si no encontramos ningún producto
            this.noFound = true;
          }
          this.products = data.data;
          this.loading = false;
        }, () => { // Aquí capturamos los errores
          this.error = true;
          this.loading = false;
        })
    } catch (error) {
      console.log(error)
    }
  }
  
  ngOnInit(): void {
  }

  verProducto() { // una manera de redirigir a un componente donde vemos con más detalle el producto seleccionado
    this.router.navigate( ['/seeProduct', this.id] )
  }

}
