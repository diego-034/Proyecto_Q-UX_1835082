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

  /* variables para el manejo de errores */
  formInvalid: boolean;
  formValid: boolean = true;

  // variables para manejar que formulario mostramos
  formaAdmin: boolean = false;
  formaUser: boolean = false;

  // Tipo de registro al que tendra acceso el usuario
  tipoRegistro: any[] = [
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
    var eleccion = $('#select'); // Elegimos el tipo de usuario que podemos escojer en un select

    eleccion.on('change', () => {
      if(eleccion.val() === "uc") { // Elegimos usuario comprador
        this.formaAdmin = false;
        this.formaUser = true; // con este mostramos el formulario de Usuario

        // Si previamente habiamos entrado en en formulario de Administrador y por algo este quedo inválido, con las lineas acontinuación lo reseteamos para que este limpio 
        if(this.formAdmin.invalid) {
          this.formValid = true;
          this.formInvalid = false;
          this.formAdmin.reset();
        }

      } else if(eleccion.val() === "av") { // Elegimos usuario vendedor
        this.formaUser = false;
        this.formaAdmin = true;// con este mostramos el formulario de Administrador

        // Si previamente habiamos entrado en en formulario de Usuario y por algo este quedo inválido, con las lineas acontinuación lo reseteamos para que este limpio 
        if(this.formUsers.invalid) {
          this.formValid = true;
          this.formInvalid = false;
          this.formUsers.reset();
        }
      }
    });
  }

  login( forma: NgForm ) {
    // console.log(forma.controls);

    // Verificamos si el formulario enviado es invalido      
    if(forma.invalid) { 

      Object.values(forma.controls).forEach(control => { // Si el formulario es invalido le ponemos un borde rojo a las cajas de texto
        control.markAsTouched();
      });

      return;
    }
    try{
      var email = forma.controls.email.value; // en esta y la siguiente linea estamos tomando el valor de las cajas de texto que se ha enviado
      var password = forma.controls.password.value;

      // Enviamos los valores obtenidos para corroborar que sean correctos y obtenemos una respuesta
      this.LoginService.login(email, password) 
        .subscribe((data: any) => {
          console.log(data);

          // Si es correcta la respuesta que tenemos nos redigira a la pantalla de incio
          if (data.token_type === "Bearer") {

            Swal.fire({
              allowOutsideClick: false,
              icon:'info',
              text: 'Espere un momento por favor...',
              timer: 500
            });
            Swal.showLoading();
            // Enviamos al servicio AuthService en la función setCookie el token de acceso y el token para refrescar
            this.AuthService.setCookie(data.access_token, data.refresh_token);
            setTimeout(() => {
              this.Router.navigate(['/admin/home']); // redirigimos a la página principal de Admin
            }, 500);
            
          }

        }, (err) => {
          // Aquí revisamos las distintas causas que pueden dar un error
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
  
  // esto es un getter en una clase, es una forma de obtener una propiedad, lo que hace es prosesar la información para verificar que sea correcta.
  // Verifica que si lo que se obtiene de las cajas de text por medio del get() es invalido y si ya el usuario hizo click en el.
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

      return (pass1 === pass2) ? false : true; // Verificamos que las contraseñas coincidan y retornamos dependiendo del resultado
    }else {
      return false;
    }
  }

  /* Creación de formGroup para Administradores y validaciones */
  // Aquí estamos creando un formato para le envio de los datos
  formAdmin = new FormGroup({
    Nombres   : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(2), this.validadores.espaciosEnBlanco ]),
    Apellidos : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(4), this.validadores.espaciosEnBlanco ]),
    Telefono  : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    Celular   : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(11), this.validadores.espaciosEnBlanco ]),
    NIT       : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), this.validadores.espaciosEnBlanco ]),
    Correo    : new FormControl('', [ Validators.required, Validators.pattern("[a-z0-9._+-]+@[a-z0-9-]+\.[a-z]{2,3}$"), this.validadores.espaciosEnBlanco ]),
    pass1     : new FormControl('', [ Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,16}") ]),
    pass2     : new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
  });

  /* Creación del formGruop para Compradores y validaciones*/
  // Aquí estamos creando un formato para le envio de los datos
  formUsers = new FormGroup({
    NombreUsuario   : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(2) , this.validadores.espaciosEnBlanco ]),
    ApellidoUsuario : new FormControl('', [ Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"), Validators.minLength(4) , this.validadores.espaciosEnBlanco ]),
    CelularUsuario  : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), this.validadores.espaciosEnBlanco ]),
    EdadUsuario     : new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(2),  this.validadores.espaciosEnBlanco ]),
    CorreoUsuario   : new FormControl('', [ Validators.required, Validators.pattern("[a-z0-9._+-]+@[a-z0-9-]+\.[a-z]{2,3}$"), this.validadores.espaciosEnBlanco ]),
    pass1Usuario    : new FormControl('', [ Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,16}") ]),
    pass2Usuario    : new FormControl('', [ Validators.required, Validators.minLength(8), Validators.maxLength(16) ])
  })
  
  /* Anadir Usuarios */
  addUser(forma: string) {

    if(forma === "admin") {

      /* Validación del formulario de Administradores, si alguna caja de texto no esta correctamente diligenciada se tornara de color rojo el borde de la caja de texto*/  
      if(this.formAdmin.invalid) {
        return Object.values(this.formAdmin.controls).forEach(control => {

          if( control instanceof FormGroup ) {
            Object.values(control.controls).forEach( control => control.markAsTouched() );
          }else {
            control.markAsTouched();
          }

        });
      }
      // resetamos las validaciones para evitar que se muestre algo que no es acorde a lo que hacemos
      this.formInvalid = false;
      this.formValid   = true;


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
          // console.log(err);
          // if(err.error.error == "PDOException") { }
          Swal.fire({
            allowOutsideClick: false,
            icon:'error',
            title: 'Error!!!',
            // text: err.error.error
            text: "Error Servidor"
          });
        })
      } catch (error) {
        console.log(error);
      }

    } 
    else if(forma === "user") {

      /* Validación del formulario de Usuarios, si alguna caja de texto no esta correctamente diligenciada se tornara de color rojo el borde de la caja de texto*/      
      if(this.formUsers.invalid) {
        return Object.values(this.formUsers.controls).forEach(control => {

          if( control instanceof FormGroup ) {
            Object.values(control.controls).forEach( control => control.markAsTouched() );
          }else {
            control.markAsTouched();
          }
        });
      }
      // resetamos las validaciones para evitar que se muestre algo que no es acorde a lo que hacemos
      this.formInvalid = false;
      this.formValid   = true;

    }

  }

  /* Servicio para envio de datos para recuperar la contraseña */
  sendMail(forma: NgForm) {

    // aquí verificamos que el input del correo a enviar no este vacio
    if(forma.invalid) { 

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }

    var email = forma.controls.emailRecovery.value; // Tomamos el valor del input

    // Llamamos el servicio de recuperación de contraseña y resivimos una respuesta
    this.LoginService.recoveryPass(email)
    .subscribe((data: any) => {
      console.log(data);

      // Esto es de la libreria de SweetAlert
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
      // En esta parte capturamos algún tipo de error que puede generar el servidor y el envio de datos a la base de datos y a la api
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

  /* Resetear formularios para evitar que siga mostrando errores o información al salir de el */
  reset() {
    this.formAdmin.reset();
    this.formUsers.reset();
    this.formaAdmin = false;
    this.formaUser = false;
    
    this.formValid = true;
    this.formInvalid = false;


    /* Resetamos el Select */
    $("#select").val($("#select option:first").val());
  }

}
