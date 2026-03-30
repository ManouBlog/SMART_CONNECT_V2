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
            $table->date("echeance",50)->change();
            $table->string("moyen_paiement",30)->change();
            $table->string("statut",30)->change();
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
            $table->date("echeance",50)->change();
            $table->string("moyen_paiement",30)->change();
            $table->string("statut",30)->change();
        });
    }
};
