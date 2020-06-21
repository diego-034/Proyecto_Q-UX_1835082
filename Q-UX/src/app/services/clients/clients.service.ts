import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getClientes() {
    try {
      return this.http.get(`http://127.0.0.1:8000/api/cliente`);
    } catch (error) {
      console.log(error)
    }
  }
}
