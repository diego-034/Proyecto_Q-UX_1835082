<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $client = Client::all(); 

            if ($client == null) {
                return $this->SendError("Error de consulta de clientes");
            }

            return $this->SendResponse($client, "Listado de Clientes");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'Nombres' => 'required|string',
                'Apellidos' => 'required|string',
                'Correo' => 'required|string',
                'Telefono' => 'required|string',
                'Celular' => 'required|string',
                'Direccion' => 'required|string',
                'TipoDocumento' => 'required|string',
                'NumeroDocumento' => 'required|string',
                'Contrasena' => 'required|string',
                'Estado' => 'required|boolean'
            ]);

            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 422);
            }

            $input = $request->all();


            $data = Client::create($input);

            return $this->SendResponse($data, "Cliente Guardado Exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
