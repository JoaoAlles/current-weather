import React from 'react';
import { translateWeather } from '../utils/translations';

function HistoryList({ history, selectedCities, onSelectCity, onDelete }) {
    if (history.length === 0) {
        return (
            <div className="card mt-4">
                <div className="card-body">
                    <h3 className="card-title">Histórico de Pesquisas</h3>
                    <p className="card-text text-muted">Nenhuma pesquisa foi salva ainda.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card mt-4">
            <div className="card-body">
                <h3 className="card-title">Histórico de Pesquisas</h3>
                <p className="card-subtitle mb-2 text-muted">Selecione duas cidades para comparar</p>
                <ul className="list-group list-group-flush">
                    {history.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{item.city_name}, {item.country}</strong>
                                <span className="ms-3 text-muted">{item.temperature}°C - {translateWeather(item.weather_description)}</span>
                                <div className="text-muted" style={{ fontSize: '0.8rem' }}>
                                    Salvo em: {new Date(item.created_at).toLocaleString('pt-BR', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div style={{ transform: 'scale(1.4)' }} className="me-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input form-check-input-custom"
                                        title={`Selecionar ${item.city_name} para comparar`}
                                        checked={selectedCities.includes(item.id)}
                                        onChange={() => onSelectCity(item.id)}
                                        disabled={selectedCities.length >= 2 && !selectedCities.includes(item.id)}
                                    />
                                </div>

                                <button
                                    className="btn btn-sm btn-outline-danger p-1"
                                    style={{ lineHeight: 1 }}
                                    title={`Excluir ${item.city_name}`}
                                    onClick={() => onDelete(item.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HistoryList;
