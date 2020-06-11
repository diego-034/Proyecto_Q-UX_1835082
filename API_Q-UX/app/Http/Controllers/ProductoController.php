<?php

namespace App\Http\Controllers;

use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Producto::all();
       
        if ($products == null) {
            return $this->SendError("Error al consultar los productos");
        }

        return $this->SendResponse($products, "Productos encontrados");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required|string',
            'Imagen' => 'string',
            'Descripcion' => 'required|string',
            'Color' => 'required|string',
            'Precio' => 'required|numeric',
            'IVA' => 'required|numeric',
            'Descuento'=>'required|numeric',
            'Estado'=>'required|boolean',
            'TallaS'=>'numeric',
            'TallaM'=>'numeric',
            'TallaL'=>'numeric'
        ]);
        if ($validator->fails()) {
            return $this->SendError("error de validación", $validator->errors(), 422);
        }
        $input = $request->all();
        $data = Producto::create($input);

        return $this->SendResponse($data, "ingreso exitoso de producto");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Producto $producto)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        //
    }
}
