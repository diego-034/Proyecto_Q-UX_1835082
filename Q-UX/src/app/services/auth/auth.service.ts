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
      
      return this.getCookie()
    } catch (error) {
      console.log(error)
      return false
    }
  }

  getCookie() {
    try {
     if(sessionStorage.getItem('Token-TKN') == null)
        return false
      return true
    } catch (error) {
      console.log(error)
      return null
    }
  }

  setCookie(token) {
    try {

      if (token == null) {
        return
      }
      sessionStorage.setItem('Token-TKN', token)
    } catch (error) {
      console.log(error)
      return
    }
  }

  destroySesion() {
    try {

      sessionStorage.removeItem('Token-TKN');
      return sessionStorage.getItem('Token-TKN')
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
