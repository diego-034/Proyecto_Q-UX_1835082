import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicio
import { AuthService } from 'src/app/services/auth/auth.service';

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
      // Verificamos si ya a iniciado sesión llamando el servcio AuthService en su funcion canActivate
      return this.AuthService.canActivate()
    } catch (error) {
      console.log(error);
    } 
  }

  destroySesion() {
    try {
      // Llamamos el servicio de AuthService y destruimos las sesión desde allí, la respuesta que nos debe retornar es false y lo guardamos en la variable destroy
      var destroy = this.AuthService.destroySesion(); 
      
      // Si obtenemos en destroy una respuesta true, entonces mostramos un error porque la sesión no termino 
      if (destroy) {
        alert("Ocurrio un error")
        return 
      }

      // Redirigimos hacia la página de inicio 
      this.Router.navigate(['/home']);
    } catch (error) {
      console.log(error)
    }
  }
}
