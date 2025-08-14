<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * This property defines a "whitelist" of attributes that are allowed
     * to be assigned using mass-assignment methods like `create()` or `update()`.
     * It's a security feature to prevent unintended modifications.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'city_name',
        'region',
        'country',
        'temperature',
        'weather_description',
        'weather_icon_url',
        'humidity',
        'wind_speed',
        'queried_at',
    ];
}
