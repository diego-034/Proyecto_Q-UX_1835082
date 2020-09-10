import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 

// Servicios
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  formaAdmin: boolean = false;
  formaUser: boolean = false;
  tipoRegistro: any[] = [ // Tipo de registro al que tendra acceso el usuario
    {
      "name": "Usuario-Comprador",
      "cod" : "uc"
    },
    {
      "name": "Administrador-Vendedor",
      "cod" : "av"
    }
  ];

  constructor(private LoginService: LoginService,
              private Router: Router,
              private AuthService: AuthService,
              private validadores: ValidadoresService) { }

  ngOnInit(): void {
    var eleccion = $('#select'); // Elegimos el tipo de usurio

    eleccion.on('change', () => {
      if(eleccion.val() === "uc") { // Elegimos usuraio comprador
        this.formaAdmin = false;
        this.formaUser = true;

        if(this.formAdmin.invalid) {
          this.formValid = true;
          this.formInvalid = false;
          this.formAdmin.reset();
        }

      } else if(eleccion.val() === "av") { // Elegimos usuario vendedor
        this.formaUser = false;
        this.formaAdmin = true;
      }
    });
  }

  login( forma: NgForm ) {
    // console.log(forma.controls);      
    if(forma.invalid) { // Verificamos si el formulario es invalido

      Object.values(forma.controls).forEach(control => { // Si es invalido marcamos todas las casillas invalidas de rojo
        control.markAsTouched();
      });

      return;
    }
    try{
      var email = forma.controls.email.value;
      var password = forma.controls.password.value;

      this.LoginService.login(email, password) // Enviamos los valores para corroborar que sean correctos 
        .subscribe((data: any) => {
          console.log(data);

          if (data.token_type === "Bearer") {

            Swal.fire({
              allowOutsideClick: false,
              icon:'info',
              text: 'Espere un momento por favor...',
              timer: 500
            });
            Swal.showLoading();
            this.AuthService.setCookie(data.access_token, data.refresh_token);
            setTimeout(() => {
              this.Router.navigate(['/admin/home']);
            }, 500);
            
          }

        }, (err) => {
          console.log(err);
          if(err.status === 400) {
            Swal.fire({
              icon:'error',
              title: 'Ha ocurrido un error',
              text:   'Revise el Correo o la Contraseña'
            });
            return;
          }
          if(err.status === 500) {
            Swal.fire({
              icon:'error',
              title: 'Error!!',
              text:   'Error de conexión con el servidor'
            });
            return;
          }
          Swal.fire({
            icon:'error',
            title: "Error!!!",
            text: 'Ha ocurrido un error'
          });
        })
    }catch(error){
      console.log(error)
    }
  }

  /* Validaciones para los input del registro */

  /* Nombre y apellido */
  // esto es un getter en una clase, es una forma de obtener una propiedad, lo que hace es prosesar la información.
  get nombreNoValido() { 
    return this.formAdmin.get('Nombres').invalid && this.formAdmin.get('Nombres').touched;
  }
  get apellidoNoValido() {
    return this.formAdmin.get('Apellidos').invalid && this.formAdmin.get('Apellidos').touched;
  }
  get telefonoNoValido() {
    return this.formAdmin.get('Telefono').invalid && this.formAdmin.get('Telefono').touched;
  }
  get celularNoValido() {
    return this.formAdmin.get('Celular').invalid && this.formAdmin.get('Celular').touched;
  }
  get nitNoValido() {
    return this.formAdmin.get('NIT').invalid && this.formAdmin.get('NIT').touched;
  }
  get correoNoValido() {
    return this.formAdmin.get('Correo').invalid && this.formAdmin.get('Correo').touched;
  }
  /* Contraseñas */
  get pass1NoValido() {
    return this.formAdmin.get('pass1').invalid && this.formAdmin.get('pass1').touched;
  }
  get pass2NoValido() {
    if ( this.formAdmin.get('pass1').touched ) {
      const pass1 = this.formAdmin.get('pass1').value;
      const pass2 = this.formAdmin.get('pass2').value;

      return (pass1 === pass2) ? false : true;
    }else {
      return false;
    }
  }

  /* Creación de formGroup para Administradores y validaciones */
  formAdmin = new FormGroup({
    Nombres   : new FormControl('', [ Validators.required, Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    Apellidos : new FormControl('', [ Validators.required, Validators.minLength(4), this.validadores.espaciosEnBlanco ]),
    Telefono  : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    Celular   : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    NIT       : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    Correo    : new FormControl('', [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,3}$"), this.validadores.espaciosEnBlanco ]),
    pass1     : new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    pass2     : new FormControl('', [ Validators.required, Validators.minLength(6) ])
  });

  /* Creación del formGruop para Compradores y validaciones*/
  formUsers = new FormGroup({
    NombreUsuario   : new FormControl('', [ Validators.required, Validators.minLength(2) , this.validadores.espaciosEnBlanco ]),
    ApellidoUsuario : new FormControl('', [ Validators.required, Validators.minLength(4) , this.validadores.espaciosEnBlanco ]),
    CelularUsuario  : new FormControl('', [ Validators.required, Validators.minLength(7) , Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    EdadUsuario     : new FormControl('', [ Validators.required, Validators.minLength(2) , Validators.pattern("^[0-9]*$"),this.validadores.espaciosEnBlanco ]),
    CorreoUsuario   : new FormControl('', [ Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,3}$"), this.validadores.espaciosEnBlanco ]),
    pass1Usuario    : new FormControl('', [ Validators.required, Validators.minLength(6) ]),
    pass2Usuario    : new FormControl('', [ Validators.required, Validators.minLength(6) ])
  })

  /* Anadir Uasuarios */

  addUser(forma: string) {
    this.formInvalid = this.formUsers.invalid;
    this.formValid   = this.formUsers.valid;

    if(forma === "admin") {

      /* Para la validacion del formulario de Administradores, si hay algo mal se marcara con rojo*/  
      if(this.formAdmin.invalid) {
        return Object.values(this.formAdmin.controls).forEach(control => {

          if( control instanceof FormGroup ) {
            Object.values(control.controls).forEach( control => control.markAsTouched() );
          }else {
            control.markAsTouched();
          }

        });
      }

      try {
        var response = this.LoginService.addUsers(this.formAdmin.value) // Enviamos los datos a guardar
        response.subscribe((data: any) => {

          if (!data.success) {
            Swal.fire({
              allowOutsideClick: false,
              icon:'error',
              title: 'Error!!!',
              text: "No se pudo añadir",
            });
            return
          }

          Swal.fire({
            allowOutsideClick: false,
            icon:'success',
            text: "Registrado Correctamente"
          });
          this.formAdmin.reset();
          
        }, err => {
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
    else if(forma === "user") {

      /* Para la validacion del formulario de Usuarios, si hay algo mal se marcara con rojo */      
      if(this.formUsers.invalid) {
        return Object.values(this.formUsers.controls).forEach(control => {

          if( control instanceof FormGroup ) {
            Object.values(control.controls).forEach( control => control.markAsTouched() );
          }else {
            control.markAsTouched();
          }
        });
      }

    }

  }

  /* Servicio para envio de datos para recuperar la contraseña */

  sendMail(forma: NgForm) {

    if(forma.invalid) { // Esto es por si envia el inout vacio

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    var email = forma.controls.emailRecovery.value;

    this.LoginService.recoveryPass(email)
    .subscribe((data: any) => {
      console.log(data);

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      if(data.success) {
        Toast.fire({
          icon: 'success',
          title: data.message
        })
        forma.reset();
      } else {
        Toast.fire({
          icon: 'error',
          title: data.message
        })
      }

    }, (err: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      
      Toast.fire({
        icon: 'error',
        title: 'Error del servidor'
      })
    });
  }

  /* Resetear al salir del modal */

  reset() {
    this.formAdmin.reset();
    this.formUsers.reset();
    this.formValid = true;
    this.formInvalid = false;
    this.formaAdmin = false;
    this.formaUser = false;

    /* Resetamos el Select */
    $("#select").val($("#select option:first").val());
  }

}
