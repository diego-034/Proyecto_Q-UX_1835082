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
  { path: 'products', component: ProductsComponent},
  { path: 'admin',
     children: [
       {
         path: 'home', // child route path
         component: HomeComponent // child route component that the router renders
       },
       {
         path: 'clients',
         component: ClientsComponent,  // another child route component that the router renders
       }
     ], canActivate:[AuthService] },
  { path: 'login', component: LoginComponent},
  { path: '**',   redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
