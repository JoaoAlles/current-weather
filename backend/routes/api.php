<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherHistoryController;

// Rota para buscar o clima de uma cidade, salvar e retornar os dados
Route::post('/weather', [WeatherHistoryController::class, 'fetchAndStore']);

// Rota para listar o histórico de pesquisas salvas
Route::get('/history', [WeatherHistoryController::class, 'index']);

// Rota para comparar o clima de duas cidades
Route::get('/compare', [WeatherHistoryController::class, 'compare']);
