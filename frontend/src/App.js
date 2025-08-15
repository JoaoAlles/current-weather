import React, { useState, useEffect } from 'react';
import apiClient from './api/axiosConfig';
import ComparisonView from './components/ComparisonView';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import HistoryList from './components/HistoryList';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);

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

    const handleSelectCity = (cityId) => {
        setSelectedCities(prevSelected => {
            if (prevSelected.includes(cityId)) {
                return prevSelected.filter(id => id !== cityId);
            } else {
                if (prevSelected.length < 2) {
                    return [...prevSelected, cityId];
                }
            }
            return prevSelected;
        });
    };

    const citiesToCompare = history.filter(city => selectedCities.includes(city.id));

    const handleDeleteHistory = async (id) => {
        setHistory(prevHistory => prevHistory.filter(item => item.id !== id));

        try {
            await apiClient.delete(`/history/${id}`);
        } catch (error) {
            console.error("Erro ao excluir item:", error);
            await fetchHistory();
            setError("Não foi possível excluir o item. Tente novamente.");
        }
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

                    <HistoryList
                        history={history}
                        selectedCities={selectedCities}
                        onSelectCity={handleSelectCity}
                        onDelete={handleDeleteHistory}
                    />

                    {citiesToCompare.length === 2 && <ComparisonView cities={citiesToCompare} />}
                </div>
            </div>
        </div>
    );
}

export default App;
