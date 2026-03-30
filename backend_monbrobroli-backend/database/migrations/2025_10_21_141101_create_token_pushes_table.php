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
        Schema::create('token_pushes', function (Blueprint $table) {
            $table->id();
        $table->unsignedBigInteger('user_id')->nullable()->index();
        $table->string('token_push', 512)->unique();
        $table->string('appareil', 100)->nullable();
        $table->timestamps();

        $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onDelete('cascade'); // supprime les tokens si user supprimé
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('token_pushes');
    }
};
