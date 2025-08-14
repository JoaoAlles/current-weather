<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('weather_histories', function (Blueprint $table) {
            $table->id();
            $table->string('city_name');
            $table->string('region')->nullable();
            $table->string('country');
            $table->integer('temperature');
            $table->string('weather_description');
            $table->string('weather_icon_url');
            $table->integer('humidity');
            $table->integer('wind_speed');
            $table->timestamp('queried_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weather_histories');
    }
};
