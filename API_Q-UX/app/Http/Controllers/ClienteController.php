<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $client = Cliente::all();
        if ($client == null) {
            return $this->SendError("Error de consulta de clientes");
        }
        return $this->SendResponse($client, "Listado de Clientes");
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
            'Nombres' => 'required|string',
            'Apellidos' => 'required|string',
            'Correo' => 'required|string',
            'Telefono' => 'required|string',
            'Celular' => 'required|string',
            'Direccion' => 'required|string',
            'TipoDocumento'=>'required|string',
            'NumeroDocumento'=>'required|string',
            'Contrasena'=> 'required|string',
            'Estado'=> 'required|boolean'
        ]);
        if ($validator->fails()) {
            return $this->SendError("error de validación", $validator->errors(), 422);
        }
        $input = $request->all();
        $data = Cliente::create($input);

        return $this->SendResponse($data, "Cliente Guardado Exitosamente");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cliente  $cliente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
