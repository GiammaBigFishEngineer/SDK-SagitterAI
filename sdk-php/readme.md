# SagitterAI PHP SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- PHP 7.4+
- Estensione `json`
- Accesso a internet per chiamate API

## Installazione
Non è richiesto alcun pacchetto esterno, ma è necessario assicurarsi che l'estensione `json` sia attiva.

## Utilizzo

### Inizializzazione del Client
```php
require_once 'SagitterAIClient.php';

$apiToken = "your_api_token_here";
$client = new SagitterAIClient($apiToken);
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```php
$response = $client->generateTableRecommendation(
    [
        "user_id" => [1, 2, 3],
        "item_id" => [101, 102, 103],
        "rating" => [5, 4, 3]
    ],
    "user_id",
    "item_id",
    "rating",
    5
);
print_r($response);
```
**Descrizione:**
- `dataJson` (array): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```php
$response = $client->generateUserRecommendation(
    [
        "user_id" => [1, 2, 3],
        "item_id" => [101, 102, 103],
        "rating" => [5, 4, 3]
    ],
    "user_id",
    "item_id",
    "rating",
    1,
    5
);
print_r($response);
```
**Descrizione:**
- `dataJson` (array): Dataset contenente interazioni utente-elemento.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `userToRecommend` (int): ID utente per cui generare le raccomandazioni.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```php
$response = $client->generatePrediction(
    [
        "feature1" => [10, 20, 30],
        "feature2" => [0.5, 0.7, 0.2]
    ],
    "feature1",
    ["feature2" => 0.6]
);
print_r($response);
```
**Descrizione:**
- `dataJson` (array): Dataset con feature per il modello di regressione.
- `columnPrediction` (string): Nome della colonna target da predire.
- `itemDict` (array): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

