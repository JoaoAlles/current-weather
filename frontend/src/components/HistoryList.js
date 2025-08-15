import React from 'react';

function HistoryList({ history }) {
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
                <ul className="list-group list-group-flush">
                    {history.map((item) => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{item.city_name}, {item.country}</strong>
                                <span className="ms-3 text-muted">{item.temperature}°C - {item.weather_description}</span>
                            </div>
                            <div>
                                {/* Checkbox que vou utilizar para a funcionalidade de comparação */}
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    title={`Selecionar ${item.city_name} para comparar`}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HistoryList;
