<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->binary('registre')->nullable();
            $table->string('contact',10)->nullable();
            $table->string('ville',30)->nullable();
            $table->string('quartier',30)->nullable();
            $table->string('gerant',30)->nullable();
            $table->string('numero_gerant',10)->nullable();
            $table->binary('piece_gerant')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entreprises', function (Blueprint $table) {
            $table->binary('registre')->nullable();
            $table->string('contact',10)->nullable();
            $table->string('ville',30)->nullable();
            $table->string('quartier',30)->nullable();
            $table->string('gerant',30)->nullable();
            $table->string('numero_gerant',10)->nullable();
            $table->binary('piece_gerant')->nullable();
        });
    }
};
