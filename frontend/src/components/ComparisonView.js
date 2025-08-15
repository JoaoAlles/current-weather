import React from 'react';
import { translateWeather } from '../utils/translations';

function ComparisonView({ cities }) {
    if (cities.length !== 2) {
        return null;
    }

    const [city1, city2] = cities;

    const getTempClass = (temp1, temp2) => {
        if (temp1 > temp2) return 'text-danger fw-bold';
        if (temp1 < temp2) return 'text-info fw-bold';
        return '';
    };

    return (
        <div className="card mt-4 shadow-lg">
            <div className="card-header">
                <h3 className="text-center">Comparação</h3>
            </div>
            <div className="card-body">
                <div className="row text-center">
                    <div className="col-6 border-end">
                        <h4>{city1.city_name}</h4>
                        <p className="text-muted">{city1.country}</p>
                        <img src={city1.weather_icon_url} alt={city1.weather_description} className="mb-2" />
                        <p className={`display-5 ${getTempClass(city1.temperature, city2.temperature)}`}>
                            {city1.temperature}°C
                        </p>
                        <p>{translateWeather(city1.weather_description)}</p>
                        <ul className="list-unstyled text-muted">
                            <li>Umidade: {city1.humidity}%</li>
                            <li>Vento: {city1.wind_speed} km/h</li>
                            <li style={{ fontSize: '0.8rem' }}>
                                Pesquisado em: {new Date(city1.created_at).toLocaleString('pt-BR', {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                            </li>
                        </ul>
                    </div>

                    <div className="col-6">
                        <h4>{city2.city_name}</h4>
                        <p className="text-muted">{city2.country}</p>
                        <img src={city2.weather_icon_url} alt={city2.weather_description} className="mb-2" />
                        <p className={`display-5 ${getTempClass(city2.temperature, city1.temperature)}`}>
                            {city2.temperature}°C
                        </p>
                        <p>{translateWeather(city2.weather_description)}</p>
                        <ul className="list-unstyled text-muted">
                            <li>Umidade: {city2.humidity}%</li>
                            <li>Vento: {city2.wind_speed} km/h</li>
                            <li style={{ fontSize: '0.8rem' }}>
                                Salvo em: {new Date(city2.created_at).toLocaleString('pt-BR', {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonView;
