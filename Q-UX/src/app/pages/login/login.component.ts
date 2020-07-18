import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';  

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  vista = false; /* Se encarga de mostrarmos y ocultarnos el formulario, iagual el de boton */
  boton = true;

  constructor(private LoginService: LoginService,
              private Router: Router,
              private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    try{

      var email = $("#email").val();
      var password = $("#password").val();

      this.LoginService.login(email, password)
        .subscribe((data: any) => {

          if (!data.data[0].Estado) {
            this.Router.navigate(['/login']);
            return
          }

          Swal.fire({
            allowOutsideClick: false,
            icon:'info',
            text: data.message,
            timer: 500
          });
          Swal.showLoading();

          this.AuthService.setCookie(data.data[0].Token)
          this.Router.navigate(['/admin/home']);
        }, (err) => {
          Swal.fire({
            icon:'error',
            title: "Error!!!",
            text: err.error.error
          });
        })
    }catch(error){
      console.log(error)
    }
  }

  /* Añadir Usuarios */
  
  formUsers = new FormGroup({
    Nombres: new FormControl(),
    Apellidos: new FormControl(),
    Telefono: new FormControl(),
    Celular: new FormControl(),
    NIT: new FormControl(),
    Correo: new FormControl(),
    Contrasena: new FormControl()
  })

  addUser() {
    try {
      var response = this.LoginService.addUsers(this.formUsers.value)
      response.subscribe((data: any) => {
        if (!data.success) {
          Swal.fire({
            allowOutsideClick: false,
            icon:'error',
            title: 'Error!!!',
            text: "No se pudo añadir",
          });
          return
        } else {
          Swal.fire({
            icon:'success',
            text: "Registrado Correctamente"
          });
          this.vista = false;
          this.boton = true;
        }
      }, err => {
        Swal.fire({
          allowOutsideClick: false,
          icon:'error',
          title: 'Error!!!',
          text: err.error.error
        });
      })
    } catch (error) {
      console.log(error)
    }
  }
}
