<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFacturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->increments('IdFactura');
            $table->decimal('Total',12,2);
            $table->decimal('DescuentoTotal',12,2);
            $table->decimal('IVATotal',12,2);
            $table->boolean('Estado');
            $table->unsignedInteger('IdCliente');
            $table->foreign('IdCliente')->references('IdCliente')->on('clientes');
            $table->unsignedInteger('IdUsuario');
            $table->foreign('IdUsuario')->references('IdUsuario')->on('usuarios');
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
        Schema::dropIfExists('facturas');
    }
}
