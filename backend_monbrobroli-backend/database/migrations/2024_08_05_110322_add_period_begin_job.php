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
        Schema::table('offres', function (Blueprint $table) {
            $table->date("job_debut")->default("2024-08-14")->nullable();
            $table->date("job_fin")->default("2024-10-14")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('offres', function (Blueprint $table) {
            $table->date("job_debut")->default("2024-08-14")->nullable();
            $table->date("job_fin")->default("2024-10-14")->nullable();
        });
    }
};
