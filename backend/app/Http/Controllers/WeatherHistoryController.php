<?php

namespace App\Http\Controllers;

use App\Models\WeatherHistory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class WeatherHistoryController extends Controller
{

    public function fetchAndStore(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'city' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $city = $request->input('city');
        $accessKey = config('services.weatherstack.key');

        $response = Http::get('http://api.weatherstack.com/current', [
            'access_key' => $accessKey,
            'query' => $city,
        ] );

        if ($response->failed() || isset($response->json()['success']) && $response->json()['success'] === false) {
            $error = $response->json()['error'] ?? ['info' => 'Erro desconhecido ao contatar a API de clima.'];
            Log::error('Erro na API Weatherstack: ', $error);
            return response()->json(['message' => 'Não foi possível obter os dados do clima para a cidade informada.'], 404);
        }

        $data = $response->json();

        try {
            $history = WeatherHistory::create([
                'city_name' => $data['location']['name'],
                'region' => $data['location']['region'],
                'country' => $data['location']['country'],
                'temperature' => $data['current']['temperature'],
                'weather_description' => $data['current']['weather_descriptions'][0],
                'weather_icon_url' => $data['current']['weather_icons'][0],
                'humidity' => $data['current']['humidity'],
                'wind_speed' => $data['current']['wind_speed'],
                'queried_at' => Carbon::createFromTimestamp($data['location']['localtime_epoch'])->toDateTimeString(),
            ]);

            return response()->json($history, 201);

        } catch (\Exception $e) {
            Log::error('Erro ao salvar no banco de dados: ' . $e->getMessage());
            return response()->json(['message' => 'Ocorreu um erro interno ao salvar os dados.'], 500);
        }
    }
}
