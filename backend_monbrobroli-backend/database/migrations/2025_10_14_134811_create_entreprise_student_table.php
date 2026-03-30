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
        Schema::create('entreprise_student_notifications', function (Blueprint $table) {
           $table->id();
            $table->foreignId('entreprise_id')->constrained('entreprises')->onDelete('cascade');
            $table->foreignId('etudiant_id')->constrained('students')->onDelete('cascade');
            $table->boolean('view')->default(false); // false = 0, true = 1
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
        Schema::dropIfExists('entreprise_student_notifications');
    }
};
