import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Paginas a las que redirigimos
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { LoginComponent } from './pages/login/login.component';
//Servicios
import {AuthService} from '../app/services/auth/auth.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent, canActivate:[AuthService]},
  { path: 'clients', component: ClientsComponent,  canActivate:[AuthService]},
  { path: 'login', component: LoginComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
