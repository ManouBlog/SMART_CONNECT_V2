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
        Schema::table('jours', function (Blueprint $table) {
            $table->string('heure_start')->change();
            $table->renameColumn('heure_start', 'First_horaire');
            $table->string('heure_end')->change();
            $table->renameColumn('heure_end', 'Second_horaire');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('jours', function (Blueprint $table) {
            $table->string('heure_start')->change();
            $table->renameColumn('First_horaire','heure_start');
            $table->string('heure_end')->change();
            $table->renameColumn('Second_horaire','heure_end');
        });
    }
};
