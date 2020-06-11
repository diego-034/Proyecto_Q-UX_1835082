<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $primaryKey = 'IdProducto';
    protected $fillable  = ['Nombre','Imagen','Descripcion','Color','Precio','IVA','Descuento','TallaS','TallaM','TallaL'];
}
