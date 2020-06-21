<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class Login extends Controller
{
    public function login(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'Correo' => 'required|email',
                'Contrasena' => 'required|string'
            ]);

            if ($validator->fails()) {
                return $this->SendError("error de validación", $validator->errors(), 422);
            }

            $user = DB::table('usuarios')
                ->select('Token', 'Estado')
                ->where('Correo', '=', $request->input('Correo'))
                ->where('Contrasena', '=',  $request->input('Contrasena'))->get();

            if ($user->isEmpty()) {
                return $this->SendResponse(
                    null,
                    "Revise el usuario y la contraseña e intente de nuevo"
                );
            }

            return $this->SendResponse($user, "Logeo exitoso de usuario");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }
}
