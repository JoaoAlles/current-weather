# Current Weather

Este é um projeto construído com React no front-end e Laravel no back-end. 
O objetivo da aplicação é consultar a previsão do tempo, salvar um histórico de pesquisas 
e permitir a comparação entre localidades.

## Stack de Tecnologias

*   **Front-end:** React
*   **Back-end:** Laravel
*   **Banco de Dados:** SQLite
*   **APIs Externas:**
    *   [ViaCEP](https://viacep.com.br/ ) - Para consulta de cidades a partir de um CEP.
    *   [Weatherstack](https://weatherstack.com/ ) - Para consulta da previsão do tempo.

## Estrutura do Projeto

O projeto está organizado em uma estrutura de monorepo, com duas pastas principais:

*   `/frontend`: Contém a aplicação React.
*   `/backend`: Contém a API RESTful em Laravel.

## Como Executar o Projeto (Em Andamento)

### Pré-requisitos

*   PHP >= 8.0
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
    Copie o arquivo de exemplo e gere a chave da aplicação.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4.  **Configure o banco de dados:**
    Este projeto utiliza SQLite para simplificar o ambiente de desenvolvimento. Crie o arquivo do banco de dados:
    ```bash
    touch database/database.sqlite
    ```
    *Certifique-se de que seu arquivo `.env` está configurado com `DB_CONNECTION=sqlite`.*

5.  **Execute as migrações:**
    Este comando criará as tabelas no banco de dados.
    ```bash
    php artisan migrate
    ```

6.  **Inicie o servidor de desenvolvimento:**
    ```bash
    php artisan serve
    ```
    A API estará disponível em `http://127.0.0.1:8000`.