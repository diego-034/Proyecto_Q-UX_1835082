import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private CookieService: CookieService) { }
  
  canActivate(){
   return this.getCookie()
  }

  getCookie() {
    return this.CookieService.check('Token-TKN')
  }

  setCookie(token = null){ 
    if(token == null) {
      return
    }
   this.CookieService.set('Token-TKN', token)
  }

  destroySesion() {
    this.CookieService.delete('Token-TKN')
    return this.CookieService.check('Token-TKN')
  }
}
