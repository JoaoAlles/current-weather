import React, { useState, useEffect } from 'react';
import apiClient from './api/axiosConfig';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import HistoryList from './components/HistoryList';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = async () => {
        try {
            const response = await apiClient.get('/history');
            setHistory(response.data);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleSaveSuccess = () => {
        fetchHistory();
    };

    const handleSearch = (data) => {
        setWeatherData(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <h1 className="text-center mb-4">Previsão do Tempo</h1>

                    <SearchForm
                        onSearch={handleSearch}
                        setIsLoading={setIsLoading}
                        setError={setError}
                    />

                    {isLoading && (
                        <div className="text-center mt-4">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Buscando...</span>
                            </div>
                        </div>
                    )}
                    {error && <div className="alert alert-danger mt-4">{error}</div>}

                    {weatherData && (
                        <WeatherDisplay
                            key={weatherData.queried_at}
                            data={weatherData}
                            onSaveSuccess={handleSaveSuccess}
                        />
                    )}

                    <HistoryList history={history} />
                </div>
            </div>
        </div>
    );
}

export default App;
