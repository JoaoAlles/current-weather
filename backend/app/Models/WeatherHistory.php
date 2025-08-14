<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherHistory extends Model
{
    use HasFactory;

    /**
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
