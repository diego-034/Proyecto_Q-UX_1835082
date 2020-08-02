import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* Ruta para añadir a un usuario */
  url = `http://127.0.0.1:8000/api/usuario`;

  constructor(private http: HttpClient) { }

  login(email, password) {
    try {

      var form = new FormData()

      form.append("Correo", email);
      form.append("Contrasena", password);

      return this.http.post(`http://127.0.0.1:8000/api/login`, form);
    } catch (error) {
      console.log(error);
    }
  }

  //Peticion POST a la API para añadir Usuario
  addUsers(FormData) {
    const formulario = {
      Apellidos: FormData.Apellidos,
      Celular: FormData.Celular,
      Correo: FormData.Correo,
      NIT: FormData.NIT,
      Nombres: FormData.Nombres,
      Telefono: FormData.Telefono,
      Contrasena: FormData.pass1
    }
    try {
      return this.http.post(this.url, formulario);
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
