<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
//Rutas de api Route::apiResource('Ruta','Controlador');
Route::apiResource('cliente','ClienteController');
Route::apiResource('delallesFactura','DetallesFacturaController');
Route::apiResource('factura','FacturaController');
Route::apiResource('producto','ProductoController');
Route::apiResource('usuario','UsuarioController');
//Rutas especiales
Route::post('login','Login@login');


