import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  vista = false; /* Se encarga de mostrarmos y ocultarnos el formulario, iagual el de boton */
  boton = true;

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    var email = $("#email").val();
    var password = $("#password").val();
    var response = this.LoginService.login(email,password);
    console.log(response);
  }
}
