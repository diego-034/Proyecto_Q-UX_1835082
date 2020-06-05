import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Importamos nuestro modulo
import { ComponentsModule } from './components/components.module';

// Componentes propios
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
