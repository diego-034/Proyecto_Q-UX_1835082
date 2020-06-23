import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Importamos nuestro modulo
import { ComponentsModule } from './components/components.module';
import{ HttpClientModule} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// Componentes propios
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { MyHomeComponent } from './pages/admin/my-home/my-home.component';
import { MyProductsComponent } from './pages/admin/my-products/my-products.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    MyHomeComponent,
    MyProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
