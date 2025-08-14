# Current Weather

Este é um projeto construído com React no front-end e Laravel no back-end. 
O objetivo da aplicação é consultar a previsão do tempo, salvar um histórico de pesquisas 
e permitir a comparação entre localidades.

## Stack de Tecnologias

*   **Front-end:** React, Axios, Bootstrap
*   **Back-end:** Laravel
*   **Banco de Dados:** SQLite
*   **APIs Externas:**
    *   [ViaCEP](https://viacep.com.br/ ) - Para consulta de cidades a partir de um CEP.
    *   [Weatherstack](https://weatherstack.com/ ) - Para consulta da previsão do tempo.

## Estrutura do Projeto

O projeto está organizado em uma estrutura de monorepo, com duas pastas principais:

*   `/frontend`: Contém a aplicação React.
*   `/backend`: Contém a API RESTful em Laravel.

## Como Executar o Projeto

### Pré-requisitos

*   PHP >= 8.2
*   Composer
*   Node.js e NPM

### Configuração do Back-end (Laravel)

1.  **Navegue até a pasta do back-end:**
    ```bash
    cd backend
    ```

2.  **Instale as dependências do PHP:**
    ```bash
    composer install
    ```

3.  **Configure o arquivo de ambiente:**
    Copie o arquivo de exemplo, preencha sua chave da API Weatherstack e gere a chave da aplicação.
    ```bash
    cp .env.example .env
    ```
    *Abra o arquivo `.env` e adicione sua `WEATHERSTACK_ACCESS_KEY`.*

4.  **Gere a chave da aplicação:**
    ```bash
    php artisan key:generate
    ```

5.  **Crie o arquivo do banco de dados e execute as migrações:**
    ```bash
    touch database/database.sqlite
    php artisan migrate
    ```

6.  **Inicie o servidor da API:**
    ```bash
    php artisan serve
    ```
    *A API estará disponível em `http://127.0.0.1:8000`.*

---

### 2. Configuração do Front-end (React )

**Abra um segundo terminal** (mantenha o servidor da API rodando no primeiro).

1.  **Navegue até a pasta do front-end:**
    ```bash
    cd frontend
    ```

2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor do React:**
    ```bash
    npm start
    ```
    *A aplicação abrirá automaticamente no seu navegador em `http://localhost:3000`.*