import React, { useState } from 'react';
import apiClient from '../api/axiosConfig';
import { translateWeather } from '../utils/translations';

function WeatherDisplay({ data, onSaveSuccess }) {
    const [isSaved, setIsSaved] = useState(false);
    const [saveError, setSaveError] = useState(null);

    if (!data) {
        return null;
    }

    const handleSave = async () => {
        if (isSaved) return;
        setSaveError(null);

        try {
            await apiClient.post('/history', data);
            setIsSaved(true);
            onSaveSuccess();
        } catch (error) {
            console.error("Erro ao salvar no histórico:", error);
            setSaveError("Não foi possível salvar a consulta. Tente novamente.");
        }
    };
    const {
        city_name,
        region,
        country,
        temperature,
        weather_description,
        weather_icon_url,
        humidity,
        wind_speed,
        queried_at
    } = data;

    const formattedDate = new Date(queried_at).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="card mt-4 shadow-sm">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h3 className="card-title mb-0">{city_name}, {region}</h3>
                        <p className="card-text text-muted">{country}</p>
                    </div>
                    <button
                        className={`btn ${isSaved ? 'btn-outline-success' : 'btn-success'}`}
                        onClick={handleSave}
                        disabled={isSaved}
                    >
                        {isSaved ? 'Salvo!' : 'Salvar'}
                    </button>
                </div>

                {saveError && <div className="alert alert-danger mt-2">{saveError}</div>}

                <hr />

                <div className="d-flex align-items-center justify-content-around text-center">
                    <div className="d-flex align-items-center">
                        <img src={weather_icon_url} alt={weather_description} style={{ width: '80px' }} />
                        <div className="ms-3">
                            <h1 className="display-4 fw-bold">{temperature}°C</h1>
                            <p className="lead mb-0">{translateWeather(weather_description)}</p>
                        </div>
                    </div>

                    <div className="ms-4">
                        <p className="mb-1"><strong>Umidade:</strong> {humidity}%</p>
                        <p className="mb-1"><strong>Vento:</strong> {wind_speed} km/h</p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>
                            Consultado às {formattedDate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;
