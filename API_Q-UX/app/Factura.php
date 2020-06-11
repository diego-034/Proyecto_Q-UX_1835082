<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    protected $primaryKey = 'IdFactura';
    protected $fillable  = ['Total','DescuentoTotal','IVATotal','Estado','IdCliente','IdUsuario'];
}
