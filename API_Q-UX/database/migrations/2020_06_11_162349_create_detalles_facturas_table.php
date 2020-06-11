<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetallesFacturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalles_facturas', function (Blueprint $table) {
            $table->increments('IdDetallesFactura');
            $table->bigInteger('Cantidad');
            $table->decimal('Total',12,2);
            $table->decimal('Descuento',12,2);
            $table->decimal('IVA',12,2);
            $table->boolean('Estado');
            $table->string('Talla',4);
            $table->unsignedInteger('IdProducto');
            $table->foreign('IdProducto')->references('IdProducto')->on('productos');
            $table->unsignedInteger('IdFactura');
            $table->foreign('IdFactura')->references('IdFactura')->on('facturas');
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
        Schema::dropIfExists('detalles_facturas');
    }
}
