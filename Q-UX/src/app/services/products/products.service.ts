import { Injectable } from '@angular/core';

//HttpClient dependencia para ahcer las peticiones
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  response = null
  //Url para las peticiones a la API de laravel
  url = `http://127.0.0.1:8000/api/producto`

  //Constructor par ainyectar las dependencias
  constructor(private http: HttpClient) { }

  //Peticion GET para obtener todos los productos
  getProducts() {
    try {
      /* Devuelve un objeto -- No es el objeto json que devuelve la api
         Este objeto se le aplica el metodo subscribe y ahi nos muestra el json de la API */
      return this.http.get(this.url);
    } catch (error) {
      console.log(error)
    }
  }

  //Petición DELETE a la API con el Id del Producto que se recibe en value
  deleteProducts(value) {
    try {
      /*  Almacenamos la respuesta en response y le apliamos 
          el metodo response para ver si el success es true o false
           y devolvemos true o false dependiendo */
      var response = this.http.delete(this.url + '/' + value)

      response.subscribe((data: any) => {
        if (!data.success) {
          return false
        }
      })
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  //Peticion POST a la API para añadir producto
  addProducts(FormData) {
    try {

      return this.http.post(this.url, FormData)
        
    } catch (error) {
      console.log(error)
      return null
    }
  }

  //Peticion de datos por id a la API
  updateProducts(value){
    try{
      return this.http.get(this.url+"/"+value)
    }catch(error){

    }
  }
}
