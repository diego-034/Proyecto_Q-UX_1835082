<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $primaryKey = 'IdCliente';
    protected $fillable  = ['Nombres','Apellidos','Correo','Telefono','Celular','Direccion','TipoDocumento','NumeroDocumento','Contrasena','Estado'];

}
