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
        Schema::table('abonement_users', function (Blueprint $table) {
            $table->integer('montant');
            $table->string('reference');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('abonement_users', function (Blueprint $table) {
            $table->integer('montant');
            $table->string('reference');
        });
    }
};
