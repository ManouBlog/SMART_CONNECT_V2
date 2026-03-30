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
        Schema::table('entreprise_student', function (Blueprint $table) {
            $table->date("dateDebut_contrat")->nullable();
            $table->date("dateFin_contrat")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('entreprise_student', function (Blueprint $table) {
            //
        });
    }
};
