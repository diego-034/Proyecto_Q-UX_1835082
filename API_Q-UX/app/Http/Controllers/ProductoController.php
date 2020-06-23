<?php

namespace App\Http\Controllers;

use Exception;
use App\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $products = Producto::all();

            if ($products == null) {
                return $this->SendError("Error al consultar los productos");
            }

            return $this->SendResponse($products, "Productos encontrados");
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
                'Nombre' => 'required|string',
                //'Imagen' => 'string',
                'Descripcion' => 'required|string',
                'Color' => 'required|string',
                'Precio' => 'required|numeric',
                //'IVA' => 'required|numeric',
                'Descuento' => 'required|numeric',
                //'Estado' => 'required|boolean',
                'TallaS' => 'numeric',
                'TallaM' => 'numeric',
                'TallaL' => 'numeric'
            ]);

            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 200);
            }

            $input = $request->all();

            $input['Imagen']="Ruta";
            $input['IVA']=0;
            $input['Estado']=1;

            $data = Producto::create($input);

            return $this->SendResponse($data, "ingreso exitoso de producto");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function show(Producto $producto)
    {
        try {
            $product = DB::table('productos')
            ->select('IdProducto', 'Nombre',
            'Descripcion','Color','Precio','IVA',
            'Descuento','TallaS','TallaM','TallaL','Estado')
            ->where('IdProducto', '=', $producto['IdProducto'])->get();
            if ($product == null) {
                return $this->SendError("error en los datos", ["el producto no existe"], 200);
            }
            return $this->SendResponse($product, "producto encontrado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
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
        try {
            if ($producto == null) {
                return $this->SendError("error en los datos", ["el producto no existe"], 422);
            }
            $validator = Validator::make($request->all(), [
                'Nombre' => 'required|string',
                //'Imagen' => 'string',
                'Descripcion' => 'required|string',
                'Color' => 'required|string',
                'Precio' => 'required|numeric',
                //'IVA' => 'required|numeric',
                'Descuento' => 'required|numeric',
                //'Estado' => 'required|boolean',
                'TallaS' => 'numeric',
                'TallaM' => 'numeric',
                'TallaL' => 'numeric'
            ]);
            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 422);
            }  
            
            $producto->Nombre = $request->get("Nombre");
            $producto->Descripcion = $request->get("Descripcion");
            $producto->Color = $request->get("Color");
            $producto->Precio = $request->get("Precio");
            $producto->Descuento = $request->get("Descuento");
            $producto->TallaS = $request->get("TallaS");
            $producto->TallaM = $request->get("TallaM");
            $producto->TallaL = $request->get("TallaL");        
            $producto->save();
            return $this->SendResponse($producto, "actualización exitosa");
        }catch(Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Producto  $producto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Producto $producto)
    {
        try {
            $product = Producto::find($producto['IdProducto']);
            if ($product == null) {
                return $this->SendError("error en los datos", ["el producto no existe"], 422);
            }
            Producto::destroy($product['IdProducto']);
            return $this->SendResponse($product, "producto eliminado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }
}
