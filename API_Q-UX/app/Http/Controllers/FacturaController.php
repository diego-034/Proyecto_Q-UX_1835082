<?php

namespace App\Http\Controllers;

use Exception;
use App\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $invoices = Factura::all();

            if ($invoices == null) {
                return $this->SendError("Error al consultar las facturas");
            }

            return $this->SendResponse($invoices, "Facturas encontrados");
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
                'Total' => 'required|numeric',
                'DescuentoTotal' => 'required|numeric',
                'IVATotal' => 'required|numeric',
                'Estado' => 'required|boolean',
                'IdCliente' => 'required|string',
                'IdUsuario' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 422);
            }
            $input = $request->all();
            $data = Factura::create($input);

            return $this->SendResponse($data, "Guardado Exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function show(Factura $factura)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Factura $factura)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Factura  $factura
     * @return \Illuminate\Http\Response
     */
    public function destroy(Factura $factura)
    {
        //
    }
}
