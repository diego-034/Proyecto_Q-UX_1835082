<?php

namespace App\Http\Controllers;

use Exception;
use App\DetallesFactura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DetallesFacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $products = DetallesFactura::all();

            if ($products == null) {
                return $this->SendError("Error al consultar los detalles del la factura");
            }

            return $this->SendResponse($products, "Detalles de la factura encontrados");
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
                'Cantidad' => 'required|numeric',
                'Total' => 'required|numeric',
                'Descuento' => 'required|numeric',
                'IVA' => 'required|numeric',
                'Estado' => 'required|boolean',
                'Talla' => 'required|string',
                'IdProducto' => 'required|numeric',
                'IdFactura' => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 422);
            }

            $input = $request->all();
            
            $data = DetallesFactura::create($input);

            return $this->SendResponse($data, "Guardado Exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DetallesFactura  $detallesFactura
     * @return \Illuminate\Http\Response
     */
    public function show(DetallesFactura $detallesFactura)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DetallesFactura  $detallesFactura
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DetallesFactura $detallesFactura)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DetallesFactura  $detallesFactura
     * @return \Illuminate\Http\Response
     */
    public function destroy(DetallesFactura $detallesFactura)
    {
        //
    }
}
