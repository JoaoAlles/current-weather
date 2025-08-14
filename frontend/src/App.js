import React from 'react';
import SearchForm from './components/SearchForm';
import './App.css';

function App() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-10 col-lg-8">
                    <h1 className="text-center mb-4">Previsão do Tempo</h1>
                    <SearchForm />
                </div>
            </div>
        </div>
    );
}

export default App;
