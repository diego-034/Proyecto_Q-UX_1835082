import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* Ruta para añadir a un usuario */
  url = `http://127.0.0.1:8000/api/users`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    try {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' :'http://127.0.0.1:8000',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
          // Authorization: 'my-auth-token'
        })
      };
      

      var form = new FormData()

      form.append("username", email);
      form.append("password", password);
      form.append("grant_type", "password");
      form.append("client_id", "2");
      form.append("client_secret", "GQMKLruQxwz6dGz50r7TVb7psnAN7qkvmLO584wz");
      
      return this.http.post(`http://127.0.0.1:8000/oauth/token`, form, httpOptions);
    } catch (error) {
      console.log(error);
    }
  }

  //Peticion POST a la API para añadir Usuario
  addUsers(FormData) {
    const formulario = {
      Apellidos: FormData.Apellidos,
      Celular: FormData.Celular,
      email: FormData.Correo,
      NIT: FormData.NIT,
      Nombres: FormData.Nombres,
      Telefono: FormData.Telefono,
      password: FormData.pass1,
      confirm_password: FormData.pass2
    }
    try {
      return this.http.post(this.url, formulario);
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
