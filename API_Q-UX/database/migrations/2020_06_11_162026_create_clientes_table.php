<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->increments('IdCliente');
            $table->string('Nombres',50);
            $table->string('Apellidos',50);
            $table->string('Correo',70);
            $table->string('Telefono',13);
            $table->string('Celular',13);
            $table->string('Direccion',100);
            $table->string('TipoDocumento',10);
            $table->string('NumeroDocumento',14);
            $table->string('Contrasena',120);
            $table->string('Token',50);
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
        Schema::dropIfExists('clientes');
    }
}
