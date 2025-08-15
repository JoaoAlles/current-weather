import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import WeatherDisplay from './components/WeatherDisplay';
import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
                    {weatherData && <WeatherDisplay key={weatherData.queried_at} data={weatherData} />}

                    <WeatherDisplay data={weatherData} />
                </div>
            </div>
        </div>
    );
}

export default App;
