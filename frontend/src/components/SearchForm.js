import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../api/axiosConfig';

function SearchForm({ onSearch, setIsLoading, setError: setAppError }) {
    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [cepError, setCepError] = useState('');

    useEffect(() => {
        const cleanCep = cep.replace(/\D/g, '');

        if (cleanCep.length === 8) {
            const fetchCityByCep = async () => {
                try {
                    setCepError('');
                    const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/` );
                    if (response.data.erro) {
                        setCity('');
                        setCepError('CEP não encontrado.');
                    } else {
                        setCity(response.data.localidade);
                    }
                } catch (err) {
                    setCity('');
                    setCepError('Erro ao buscar o CEP. Tente novamente.');
                    console.error(err);
                }
            };
            fetchCityByCep();
        } else {
            setCity('');
            setCepError('');
        }
    }, [cep]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!city) {
            setAppError('Por favor, informe um CEP válido para encontrar uma cidade.');
            return;
        }

        setIsLoading(true);
        setAppError(null);

        try {
            const response = await apiClient.post('/weather', { city });
            onSearch(response.data);
        } catch (error) {
            console.error('Erro ao buscar previsão do tempo:', error);
            if (error.response && error.response.status === 404) {
                setAppError('Não foi possível encontrar a previsão do tempo para esta cidade.');
            } else {
                setAppError('Ocorreu um erro no servidor. Tente novamente mais tarde.');
            }
            onSearch(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="card p-4 mb-4">
            {cepError && <div className="alert alert-warning">{cepError}</div>}

            <h2 className="mb-3">Consultar Clima</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                        <label htmlFor="cep" className="form-label">CEP</label>
                        <input
                            type="text"
                            className={`form-control ${cepError ? 'is-invalid' : ''}`}
                            id="cep"
                            placeholder="Digite o CEP"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            maxLength="9"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="O nome da cidade aparecerá aqui"
                            value={city}
                            readOnly
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-custom-purple w-100" disabled={!city}>
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
