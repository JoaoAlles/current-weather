import React, { useState } from 'react'; // 1. Importe o useState
import SearchForm from './components/SearchForm';
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
                    <h1 className="text-center mb-4">Desafio de Previsão do Tempo</h1>

                    <SearchForm
                        onSearch={handleSearch}
                        setIsLoading={setIsLoading}
                        setError={setError}
                    />

                    {isLoading && <p className="text-center">Buscando...</p>}
                    {error && <div className="alert alert-danger mt-4">{error}</div>}
                </div>
            </div>
        </div>
    );
}

export default App;
