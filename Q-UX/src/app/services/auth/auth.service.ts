import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private CookieService: CookieService) {
    this.CookieService.deleteAll()
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

      return this.CookieService.check('Token-TKN')
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
      this.CookieService.set('Token-TKN', token)
    } catch (error) {
      console.log(error)
      return
    }
  }

  destroySesion() {
    try {

      this.CookieService.delete('Token-TKN')
      return this.CookieService.check('Token-TKN')
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
