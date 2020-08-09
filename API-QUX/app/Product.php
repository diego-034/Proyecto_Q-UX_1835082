<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'IdProducto';
    protected $fillable  = ['Nombre','Imagen','Descripcion','Color','Precio','IVA','Descuento','TallaS','TallaM','TallaL','Estado'];

}
