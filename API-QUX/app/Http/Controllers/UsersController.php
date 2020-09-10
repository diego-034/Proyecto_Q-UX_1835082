<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\Validator;

use App\Mail\recoveryPass;
use Illuminate\Support\Facades\Mail;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {

            $users = User::all();

            if ($users == null) {
                return $this->SendError("Error al consultar Usuarios");
            }

            return $this->SendResponse($users, "Usuarios existentes");
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
                'Nombres'=> 'required|string',
                'Apellidos' => 'required|string',
                'Telefono' => 'required|string',
                'Celular' => 'required|string',
                'NIT' => 'required|string',
                'email' => 'required|email',
                'password' => 'required|string',  
                'confirm_password' => 'required|same:password'
            ]);

            if ($validator->fails()) {
                return $this->SendError("Ha ocurrido un Error", $validator->errors(), 422);
            }

            $input = $request->all();
            $input["password"] = bcrypt($request->get("password"));
            $input["Estado"] = 1;
            $data = User::create($input);

            // $data['token'] = $data->createToken("MyApp")->accessToken;
   
            return $this->sendResponse($data, "Usuario y Token");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        try {
            $user = User::find($user);
            if ($user == null) {
                return $this->SendError("error en los datos", ["el usuario no existe"], 200);
            }
            return $this->SendResponse($user, "usuario encontrado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $user = User::find($user['id']);
            if ($user == null) {
                return $this->SendError("error en los datos", ["el usuario no existe"], 422);
            }
            User::destroy($user['id']);
            return $this->SendResponse($user, "Usuario eliminado exitosamente");
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
    }

    public function recovery(Request $request)
    {

        try {
            $input = $request->all();

            $email = $input['email'];

            $users = DB::table('users')
            ->select('email')
            ->where('email', '=', $email)->get();
    
            if(empty($users[0]->email)) {
                return $this->SendError($users, ["Usuario no existe"], 200);
            }
            
            Mail::to($input['email'])->send(new recoveryPass('Correo'));
            return $this->SendResponse($users, "Se ha enviado un mensaje a la direccion de correo especificada"); 
        } catch (Exception $ex) {
            return $this->SendError($ex->__toString());
        }
        
    }
}
