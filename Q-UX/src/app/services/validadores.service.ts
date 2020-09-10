import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface ErrorValidate {
  [s:string]: boolean // Esto quiere decir que puede regresar cualquier cantidad de llaves y su valor va a ser booleano
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  /* Validar las contraseñas */
  passwordsIguales() {
    return ( formGroup: FormGroup ) => { ( formGroup.get('pass1').value === formGroup.get('pass2').value ) ? formGroup.get('pass2').setErrors( null ) : formGroup.get('pass2').setErrors({ mismatched: true}); }
  }

  /* Evitar espacios en blanco */
  espaciosEnBlanco( control: FormControl ): ErrorValidate {
    const espacioBlanco = (control.value || '').length === 0;
    const esValido = espacioBlanco;
    return esValido ? { espacioBlanco: true } : null;
  }

}
