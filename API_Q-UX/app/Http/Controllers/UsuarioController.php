<?php

namespace App\Http\Controllers;

use App\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = Usuario::all();
       
        if ($users == null) {
            return $this->SendError("Error al consultar Usuarios");
        }

        return $this->SendResponse($users, "Usuarios existentes");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Nombres' => 'required|string',
            'Apellidos' => 'required|string',
            'Correo' => 'required|email',
            'Telefono' => 'required|numeric',
            'Celular' => 'required|numeric',
            'NIT' => 'required|integer',
            'Contrasena'=>'required|string',
            'Estado'=>'required|boolean'
        ]);
        if ($validator->fails()) {
            return $this->SendError("error de validación", $validator->errors(), 422);
        }
        $input = $request->all();
        $data = Usuario::create($input);

        return $this->SendResponse($data, "ingreso exitoso de usuario");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        //
    }
}
