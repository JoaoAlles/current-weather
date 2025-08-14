import React from 'react';

function SearchForm() {
    return (
        <div className="card p-4 mb-4">
            <h2 className="mb-3">Consultar Clima</h2>
            <form>
                <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                        <label htmlFor="cep" className="form-label">CEP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cep"
                            placeholder="Digite o CEP"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            placeholder="O nome da cidade aparecerá aqui"
                            readOnly
                        />
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchForm;
