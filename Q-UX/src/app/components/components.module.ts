import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  exports: [ // esto es para exportar los componentes que aquí tenemos
    NavbarComponent,
    FooterComponent,
    ProductsComponent,
    ContactUsComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
