import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Importamos nuestro modulo
import { ComponentsModule } from './components/components.module';
import{ HttpClientModule} from '@angular/common/http'; 
// Componentes propios
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
