<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $primaryKey = 'IdUsuario';
    protected $fillable  = ['Nombres','Apellidos','Correo','Telefono','Celular','NIT','Contrasena','Estado'];
}
