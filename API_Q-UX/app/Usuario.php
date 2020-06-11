<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $primaryKey = 'IdUsuario';
    protected $fillable  = ['Nombre','FechaApertura'];
}
