import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor() { }

  canActivate(){
    return false
  }
}
