import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private LoginService: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    var email = document.querySelector("#email").nodeValue,
        password = document.querySelector("#password").nodeValue;
    var response = this.LoginService.login(email,password);
    console.log(response);
  }
}
