import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
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

  constructor(private LoginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    var email = $("#email").val();
    var password = $("#password").val();
    this.LoginService.login(email, password)
      .subscribe((data: any) => {
        if (data.success) {
          alert(data.message)
          if (!data.data[0].Estado) {
            this.router.navigate(['/login']);
          }
          this.router.navigate(['/home']);

        } else {
          alert(data.error)
        }
      })

  }
}
