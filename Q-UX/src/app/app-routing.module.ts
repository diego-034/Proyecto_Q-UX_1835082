import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Paginas a las que redirigimos
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';

import { LoginComponent } from './pages/login/login.component';
import { MyHomeComponent } from './pages/admin/my-home/my-home.component';
import { MyProductsComponent } from './pages/admin/my-products/my-products.component';

//Servicios
import {AuthService} from '../app/services/auth/auth.service';





const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'admin',
     children: [
       {
         path: 'home', // child route path
         component: MyHomeComponent, // child route component that the router renders
       },       
       {
        path: 'products', // child route path
        component: MyProductsComponent, // child route component that the router renders
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
