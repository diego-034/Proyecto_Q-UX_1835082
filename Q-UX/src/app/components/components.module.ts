import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { FormProductsComponent } from './form-products/form-products.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent,
    FormProductsComponent
  ],
  exports: [ // esto es para exportar los componentes que aquí tenemos
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent,
    FormProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
