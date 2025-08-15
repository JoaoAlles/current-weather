<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherHistoryController;

// Rota para buscar os dados do clima de uma cidade
Route::post('/weather', [WeatherHistoryController::class, 'fetch']);

// Rota para salvar no histórico
Route::post('/history', [WeatherHistoryController::class, 'store']);

// Rota para listar o histórico de pesquisas salvas
Route::get('/history', [WeatherHistoryController::class, 'index']);

// Rota para comparar o clima de duas cidades
Route::get('/compare', [WeatherHistoryController::class, 'compare']);
