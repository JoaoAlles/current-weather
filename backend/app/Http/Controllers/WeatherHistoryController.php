<?php

namespace App\Http\Controllers;

use App\Models\WeatherHistory;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class WeatherHistoryController extends Controller
{

    public function fetch(Request $request): JsonResponse
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

        if ($response->failed() || (isset($response->json()['success']) && $response->json()['success'] === false)) {
            $error = $response->json()['error'] ?? ['info' => 'Erro desconhecido ao contatar a API de clima.'];
            Log::error('Erro na API Weatherstack: ', $error);
            return response()->json(['message' => 'Não foi possível obter os dados do clima para a cidade informada.'], 404);
        }

        $data = $response->json();

        $formattedData = [
            'city_name' => $data['location']['name'],
            'region' => $data['location']['region'],
            'country' => $data['location']['country'],
            'temperature' => $data['current']['temperature'],
            'weather_description' => $data['current']['weather_descriptions'][0],
            'weather_icon_url' => $data['current']['weather_icons'][0],
            'humidity' => $data['current']['humidity'],
            'wind_speed' => $data['current']['wind_speed'],
            'queried_at' => Carbon::createFromTimestamp($data['location']['localtime_epoch'])->toDateTimeString(),
        ];

        return response()->json($formattedData);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'city_name' => 'required|string',
            'region' => 'required|string',
            'country' => 'required|string',
            'temperature' => 'required|integer',
            'weather_description' => 'required|string',
            'weather_icon_url' => 'required|url',
            'humidity' => 'required|integer',
            'wind_speed' => 'required|integer',
            'queried_at' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $history = WeatherHistory::create($request->all());
            return response()->json($history, 201);
        } catch (Exception $e) {
            Log::error('Erro ao salvar no banco de dados: ' . $e->getMessage());
            return response()->json(['message' => 'Ocorreu um erro interno ao salvar os dados.'], 500);
        }
    }

    public function index(): JsonResponse
    {
        try {
            $history = WeatherHistory::latest()->get();
            return response()->json($history);
        } catch (Exception $e) {
            Log::error('Erro ao buscar histórico: ' . $e->getMessage());
            return response()->json(['message' => 'Ocorreu um erro interno ao buscar o histórico.'], 500);
        }
    }

    public function compare(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'city1_id' => 'required|integer|exists:weather_histories,id',
            'city2_id' => 'required|integer|exists:weather_histories,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $city1 = WeatherHistory::findOrFail($request->input('city1_id'));
            $city2 = WeatherHistory::findOrFail($request->input('city2_id'));

            $comparison = [
                'city1' => $city1,
                'city2' => $city2,
            ];

            return response()->json($comparison);
        } catch (Exception $e) {
            Log::error('Erro ao comparar cidades: ' . $e->getMessage());
            return response()->json(['message' => 'Ocorreu um erro interno ao comparar as cidades.'], 500);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
            $historyItem = WeatherHistory::findOrFail($id);
            $historyItem->delete();

            return response()->json(null, 204);

        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Registro não encontrado.'], 404);
        } catch (Exception $e) {
            Log::error('Erro ao excluir do histórico: ' . $e->getMessage());
            return response()->json(['message' => 'Ocorreu um erro interno ao excluir o registro.'], 500);
        }
    }
}
