import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* Ruta para añadir a un usuario */
  url = `http://127.0.0.1:8000/api/login`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    try {
      
      
      

      var form = new FormData()

      form.append("username", email);
      form.append("password", password);
      form.append("grant_type", "password");
      form.append("client_id", "2");
      form.append("client_secret", "CfIWoZUk5iF2b63AZbwsRqFCjggeyIYuik7e3UsP");
      
      return this.http.post(`http://127.0.0.1:8000/oauth/token`, form);
    } catch (error) {
      console.log(error);
    }
  }

  //Peticion POST a la API para añadir Usuario
  addUsers(FormData) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin' :'*',
          'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding',
          'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS, DELETE'
          // Authorization: 'my-auth-token'
        })
      };
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
