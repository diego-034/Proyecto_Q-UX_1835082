<?php

namespace App\Http\Controllers;

use Exception;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $products = Product::all();

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

            $data = Product::create($input);

            return $this->SendResponse($data, "ingreso exitoso de producto");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product, $id)
    {
        try {
            $product = DB::table('products')
            ->select('IdProducto', 'Nombre',
            'Descripcion','Color','Precio','IVA',
            'Descuento','TallaS','TallaM','TallaL','Estado')
            ->where('IdProducto', '=', $id)->get();
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
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product, $id)
    {
        try {

            $product = Product::find($id);
            if ($product == null) {
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
            
            $product->Nombre = $request->get("Nombre");
            $product->Descripcion = $request->get("Descripcion");
            $product->Color = $request->get("Color");
            $product->Precio = $request->get("Precio");
            $product->Descuento = $request->get("Descuento");
            $product->TallaS = $request->get("TallaS");
            $product->TallaM = $request->get("TallaM");
            $product->TallaL = $request->get("TallaL");        
            $product->save();
            return $this->SendResponse($product, "actualización exitosa");
        }catch(Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product, $id)
    {
        
        try {
            $product = Product::find($id);
            if ($product == null) {
                return $this->SendError("error en los datos", ["el producto no existe"], 422);
            }
            Product::destroy($product['IdProducto']);
            return $this->SendResponse($product, "producto eliminado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }
}
