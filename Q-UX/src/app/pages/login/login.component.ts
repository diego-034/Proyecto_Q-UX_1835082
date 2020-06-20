import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { AuthService } from 'src/app/services/auth/auth.service';

import { Router } from '@angular/router';
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
    var email = $("#email").val();
    var password = $("#password").val();
    this.LoginService.login(email, password)
      .subscribe((data: any) => {
        alert(data.message)
        if (!data.data[0].Estado) {
          this.Router.navigate(['/login']);
          return
        }
        this.Router.navigate(['/admin/home']);
        this.AuthService.setCookie(data.data[0].Token)
      })
  }
}
