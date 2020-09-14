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
    // Verificamos que las contraseñas y enviamos una respuesta que valide si son correctas (identicas) o no
    return ( formGroup: FormGroup ) => { ( formGroup.get('pass1').value === formGroup.get('pass2').value ) ? formGroup.get('pass2').setErrors( null ) : formGroup.get('pass2').setErrors({ mismatched: true}); }
  }

  /* Evitar espacios en blanco */
  espaciosEnBlanco( control: FormControl ): ErrorValidate {
    const espacios = (control.value || '').trim();// Primero eliminamos los espacios 
  
    const espacioBlanco = espacios.length === 0; // Validamos que al no tener espacios tengamos algo copiado
    return espacioBlanco ? { espacioBlanco: true } : null; // si no hay nada copiado en la caja de texto retorna true.
  }

  // Este es para el actualizar productos de la vista del admin
  espacioBlanco(control: FormControl) {
    const espacioBlanco = (control.value || '').length === 0; // Validamos que al no tener espacios tengamos algo copiado
    return espacioBlanco ? { espacioBlanco: true } : null; // si no hay nada copiado en la caja de texto retorna true.
  }

}
