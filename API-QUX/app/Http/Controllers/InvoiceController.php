<?php

namespace App\Http\Controllers;

use App\Invoice;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $invoices = Invoice::all();

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
            
            $data = Invoice::create($input);

            return $this->SendResponse($data, "Guardado Exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
