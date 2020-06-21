import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private AuthService: AuthService,
    private Router: Router) { }

  ngOnInit(): void {
  }

  canActivate() {
    try {

      return this.AuthService.canActivate()
    } catch (error) {
      console.log(error);
    }
  }

  destroySesion() {
    try {

      var destroy = this.AuthService.destroySesion();

      if (destroy) {
        alert("Ocurrio un error")
        return
      }

      this.Router.navigate(['/home']);
    } catch (error) {
      console.log(error)
    }
  }
}
