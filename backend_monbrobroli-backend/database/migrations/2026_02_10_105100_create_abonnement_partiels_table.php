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
        Schema::create('abonnement_partiels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->foreignId('abonnement_user_id')
                ->constrained('abonement_users')
                ->cascadeOnDelete();
            $table->string('reference_transaction')->nullable();
            $table->string('montant')->nullable();
             $table->date('date_echeance');
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
        Schema::dropIfExists('abonnement_partiels');
    }
};
