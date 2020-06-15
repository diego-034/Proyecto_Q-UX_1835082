import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email,password){
    var form = new FormData()
    form.append("Correo",email)
    form.append("Contrasena",password)
    return this.http.post(`http://127.0.0.1:8000/api/usuario/login`,form);
  }
}
