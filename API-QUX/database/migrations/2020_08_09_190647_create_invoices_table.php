<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('IdFactura');
            $table->decimal('Total',12,2);
            $table->decimal('DescuentoTotal',12,2);
            $table->decimal('IVATotal',12,2);
            $table->boolean('Estado');
            $table->unsignedInteger('IdCliente');
            $table->foreign('IdCliente')->references('IdCliente')->on('clients');
            $table->foreignId('IdUsuario')->constrained('users');
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
        Schema::dropIfExists('invoices');
    }
}
