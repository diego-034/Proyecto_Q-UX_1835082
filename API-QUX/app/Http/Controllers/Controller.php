<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Exception;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
     //Respuesta conrrecta
     public function SendResponse($result, $message)
     {
         try {
 
             $response = [
                 "success" => true,
                 "data" => $result,
                 "message" => $message
             ];
 
             return response()->json($response, 200);
         } catch (Exception $ex) {
             return response()->json([$ex->__toString()], 404);
         }
     }
 
     //Respuesta de Error
     public function SendError($error, $errorMessage = [], $code = 404)
     {
         try {
 
             $response = [
                 "success" => false,
                 "error" => $error,
                 "message" => $errorMessage
             ];
 
             return response()->json($response, $code);
         } catch (Exception $ex) {
             return response()->json([$ex->__toString()], 404);
         }
     }
}
