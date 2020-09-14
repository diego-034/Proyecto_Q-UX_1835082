import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /* Ruta para añadir a un usuario */
  // esta ruta nos manda a la api en laravel que se encarga de hacer las validaciones por parte del servidor.
  url = `http://127.0.0.1:8000/api/login`;

  constructor(private http: HttpClient) { }

  // Funcion par validar el inicio de sesion y el envio de token
  login(email: string, password: string) {
    try {
      
      // Estos son los Headers que hay que enviar para que la petición sea correcta
      var form = new FormData()
      form.append("username", email);
      form.append("password", password);
      form.append("grant_type", "password");
      form.append("client_id", "2");
      form.append("client_secret", "GQMKLruQxwz6dGz50r7TVb7psnAN7qkvmLO584wz");
      
      return this.http.post(`http://127.0.0.1:8000/oauth/token`, form); // De esto retormanos el token_type el refresh_token el access-token y expires_in
    } catch (error) {
      console.log(error);
    }
  }

  //Peticion POST a la API para añadir Usuario
  addUsers(FormData) {
    // const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Content-Type':  'application/json',
    //       'Accept': 'application/json',
    //       'Access-Control-Allow-Origin' :'*',
    //       'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding',
    //       'Access-Control-Allow-Methods': 'PUT, POST, GET, OPTIONS, DELETE'
    //     })
    //   };

    /* Arreglo de formulario para enviar la información a la api */
    const formulario = {
      Apellidos: FormData.Apellidos,
      Celular  : FormData.Celular,
      email    : FormData.Correo,
      NIT      : FormData.NIT,
      Nombres  : FormData.Nombres,
      Telefono : FormData.Telefono,
      password : FormData.pass1,
      confirm_password: FormData.pass2
    }
    try {
      return this.http.post(this.url, formulario); // enviamos los datos (el formulario) a la URL provista (que es de la api)
    } catch (error) {
      console.log(error);
      return null
    }
  }
  // Función para recuperar la contraseña
  recoveryPass(email:string) {
    var forma = {
      "email": email
    }
    try {
      return this.http.post(`${this.url}/recovery`, forma); // enviamos el email que nos provean a la api en la direccion de recuperación de contraseña
    } catch (error) {
      
    }
  }
}
