<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('IdUsuario');
            $table->string('Nombres',50);
            $table->string('Apellidos',50);
            $table->string('Correo',70);
            $table->string('Telefono',13);
            $table->string('Celular',13);
            $table->string('Token',50);
            $table->string('NIT',50);
            $table->string('Contrasena',120);
            $table->boolean('Estado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
