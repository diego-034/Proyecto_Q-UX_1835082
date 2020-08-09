<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InvoiceDetails extends Model
{
    protected $primaryKey = 'IdDetallesFactura';
    protected $fillable  = ['Cantidad','Total','Descuento','IVA','Estado','Talla','IdProducto','IdFactura'];
}
