import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { ClientComponent } from './client/client.component';
import { FormComponent } from './form/form.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent,
    FormComponent  ],
  exports: [ // esto es para exportar los componentes que aquí tenemos
    NavbarComponent,
    FooterComponent,
    ProductComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
