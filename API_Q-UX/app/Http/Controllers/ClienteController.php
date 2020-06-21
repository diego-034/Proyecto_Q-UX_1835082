<?php

namespace App\Http\Controllers;

use App\Cliente;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $client = Cliente::all();
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
            $flag = false;
            do {
                $token = Str::random(40);
                $tokenDb = DB::table('clientes')->where('Token', '=', $token)->get();
                if ($tokenDb == null) {
                    $flag = true;
                }
            } while ($flag);

            $input['Token'] = $token;
            $data = Cliente::create($input);

            return $this->SendResponse($data, "Cliente Guardado Exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
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
