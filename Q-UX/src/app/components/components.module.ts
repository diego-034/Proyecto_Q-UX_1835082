import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { FormProductsComponent } from './form-products/form-products.component';
import { TableProductsComponent } from './table-products/table-products.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent,
    FormProductsComponent,
    TableProductsComponent,
    VerProductoComponent,
    ErrorComponent,
    LoadingComponent
  ],
  exports: [ // esto es para exportar los componentes que aquí tenemos
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent,
    FormProductsComponent,
    TableProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
