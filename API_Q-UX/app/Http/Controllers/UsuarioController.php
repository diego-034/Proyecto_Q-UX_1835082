<?php

namespace App\Http\Controllers;

use App\Usuario;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $users = Usuario::all();

            if ($users == null) {
                return $this->SendError("Error al consultar Usuarios");
            }

            return $this->SendResponse($users, "Usuarios existentes");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

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
                'Correo' => 'required|email',
                'Telefono' => 'required|numeric',
                'Celular' => 'required|numeric',
                'NIT' => 'required|integer',
                'Contrasena' => 'required|string',  
                //'Estado' => 'required|boolean'
            ]);

            if ($validator->fails()) {
                return $this->SendError("Ha ocurrido un Error", $validator->errors(), 422);
            }

            $input = $request->all();

            $input['Estado']=1;

            $flag = false;

            do {
                $token = Str::random(40);

                $tokenDb = DB::table('usuarios')->where('Token', '=', $token)->get();

                if ($tokenDb == null) {
                    $flag = true;
                }
            } while ($flag);

            $input['Token'] = $token;

            $data = Usuario::create($input);

            return $this->SendResponse($data, "Registrado Correctamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function show(Usuario $usuario)
    {
        try {
            $usuario = Usuario::find($usuario['IdUsuario']);
            if ($usuario == null) {
                return $this->SendError("error en los datos", ["el usuario no existe"], 200);
            }
            return $this->SendResponse($usuario, "usuario encontrado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Usuario $usuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Usuario  $usuario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Usuario $usuario)
    {
        try {
            $usuario = Usuario::find($usuario['IdUsuario']);
            if ($usuario == null) {
                return $this->SendError("error en los datos", ["el usuario no existe"], 422);
            }
            Usuario::destroy($usuario['IdUsuario']);
            return $this->SendResponse($usuario, "Usuario eliminado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }
}
