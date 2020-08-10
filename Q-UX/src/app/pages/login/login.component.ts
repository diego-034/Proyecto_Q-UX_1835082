import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';  

// Servicios
import { ValidadoresService } from '../../services/validadores.service';

// SweetAlert
import Swal from '../../../assets/js/sweetalert2.all.min.js';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  formInvalid: boolean;
  formValid: boolean = true;
  emailNoValido: boolean;
  passLoginNoValido: boolean;

  constructor(private LoginService: LoginService,
              private Router: Router,
              private AuthService: AuthService,
              private validadores: ValidadoresService) { }

  ngOnInit(): void {
  }

  login( forma: NgForm ) {
    // console.log(forma.controls);      
    if(forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
    try{
      var email = forma.controls.email.value;
      var password = forma.controls.password.value;

      this.LoginService.login(email, password)
        .subscribe((data: any) => {
          console.log(data);

          if (data.token_type === "Bearer") {

            Swal.fire({
              allowOutsideClick: false,
              icon:'info',
              text: data.message,
              timer: 500
            });
            Swal.showLoading();
  
            this.AuthService.setCookie(data.access_token, data.refresh_token);
            this.Router.navigate(['/admin/home']);

          }

        }, (err) => {
          Swal.fire({
            icon:'error',
            title: "Error!!!",
            text: err.error.message
          });
        })
    }catch(error){
      console.log(error)
    }
  }

  /* Validaciones para los input del registro */

  /* Nombre y apellido */
  get nombreNoValido() { // esto es un getter en una clase, es una forma de obtener una propiedad, lo que hace es prosesar la información.
    return this.formUsers.get('Nombres').invalid && this.formUsers.get('Nombres').touched;
  }
  get apellidoNoValido() {
    return this.formUsers.get('Apellidos').invalid && this.formUsers.get('Apellidos').touched;
  }
  get telefonoNoValido() {
    return this.formUsers.get('Telefono').invalid && this.formUsers.get('Telefono').touched;
  }
  get celularNoValido() {
    return this.formUsers.get('Celular').invalid && this.formUsers.get('Celular').touched;
  }
  get nitNoValido() {
    return this.formUsers.get('NIT').invalid && this.formUsers.get('NIT').touched;
  }
  get correoNoValido() {
    return this.formUsers.get('Correo').invalid && this.formUsers.get('Correo').touched;
  }
  /* Contraseñas */
  get pass1NoValido() {
    return this.formUsers.get('pass1').invalid && this.formUsers.get('pass1').touched;
  }
  get pass2NoValido() {
    if ( this.formUsers.get('pass1').touched ) {
      const pass1 = this.formUsers.get('pass1').value;
      const pass2 = this.formUsers.get('pass2').value;

      return (pass1 === pass2) ? false : true;
    }else {
      return false;
    }
  }

  /* Añadir Usuarios */
  
  formUsers = new FormGroup({
    Nombres  : new FormControl('', [ Validators.required, Validators.minLength(2) , this.validadores.espaciosEnBlanco ]),
    Apellidos: new FormControl('', [ Validators.required, Validators.minLength(4) , this.validadores.espaciosEnBlanco ]),
    Telefono : new FormControl('', [ Validators.required, Validators.minLength(7) , Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    Celular  : new FormControl('', [ Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    NIT      : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    Correo   : new FormControl('', [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,3}$"), this.validadores.espaciosEnBlanco ]),
    pass1    : new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    pass2    : new FormControl('', [ Validators.required, Validators.minLength(6) ])
  })

  addUser() {
    this.formInvalid = this.formUsers.invalid;
    this.formValid   = this.formUsers.valid;

    if(this.formUsers.invalid) {
      return Object.values(this.formUsers.controls).forEach(control => {

        if( control instanceof FormGroup ) {
          Object.values(control.controls).forEach( control => control.markAsTouched() );
        }else {
          control.markAsTouched();
        }
      });
    }

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
            allowOutsideClick: false,
            icon:'success',
            text: "Registrado Correctamente"
          });
          this.formUsers.reset();
        }
      }, err => {
        console.log(err);
        Swal.fire({
          allowOutsideClick: false,
          icon:'error',
          title: 'Error!!!',
          text: err.error.error
        });
      })
    } catch (error) {
      console.log(error);
    }
  }

  /* Resetear al salir del modal */

  reset() {
    this.formUsers.reset();
    this.formValid = true;
    this.formInvalid = false;
  }

}
