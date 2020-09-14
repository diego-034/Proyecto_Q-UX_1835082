import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor() {
    sessionStorage.clear()
   }

  canActivate() {
    try {
      // llamamos la función y retornamos el resultado
      return this.getCookie()
    } catch (error) {
      console.log(error)
      return false
    }
  }

  getCookie() {
    try {
      // Buscamos si no ha iniciado sesión. si ya inicio retornamos true
      return sessionStorage.getItem('Token-TKN') == null ? false : true;
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // Resivimos el token y token refresh enviado al iniciar sesión para guardarlos en el sessionStorage
  setCookie(token: string, refresh: string) {
    try {

      if (token == null && refresh == null) {
        return
      }
      // Guardamos los datos en le sessionStorage
      sessionStorage.setItem('Token-TKN', token);
      sessionStorage.setItem('Refresh-TKN', refresh );
    } catch (error) {
      console.log(error)
      return
    }
  }

  // Aquí destruimos lo que haya en el sessionStorage
  destroySesion() {
    try {
      sessionStorage.removeItem('Token-TKN');
      sessionStorage.removeItem('Refresh-TKN');
      // retornamos lo que queda en el sessionStorage que debe ser null
      return sessionStorage.getItem('Token-TKN')
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
