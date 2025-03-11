# SagitterAI Node.js SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- Node.js 14+
- Modulo `axios` installato

## Installazione
### Installazione delle dipendenze
```bash
npm install axios
```

## Utilizzo

### Inizializzazione del Client
```javascript
const SagitterAIClient = require('./SagitterAIClient');

const apiToken = "your_api_token_here";
const client = new SagitterAIClient(apiToken);
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```javascript
(async () => {
    try {
        const response = await client.generateTableRecommendation(
            { "user_id": [1, 2, 3], "item_id": [101, 102, 103], "rating": [5, 4, 3] },
            "user_id",
            "item_id",
            "rating",
            5
        );
        console.log(response);
    } catch (error) {
        console.error("Errore: ", error);
    }
})();
```
**Descrizione:**
- `dataJson` (object): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `topK` (number): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```javascript
(async () => {
    try {
        const response = await client.generateUserRecommendation(
            { "user_id": [1, 2, 3], "item_id": [101, 102, 103], "rating": [5, 4, 3] },
            "user_id",
            "item_id",
            "rating",
            1,
            5
        );
        console.log(response);
    } catch (error) {
        console.error("Errore: ", error);
    }
})();
```
**Descrizione:**
- `dataJson` (object): Dataset contenente interazioni utente-elemento.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `userToRecommend` (number): ID utente per cui generare le raccomandazioni.
- `topK` (number): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```javascript
(async () => {
    try {
        const response = await client.generatePrediction(
            { "feature1": [10, 20, 30], "feature2": [0.5, 0.7, 0.2] },
            "feature1",
            { "feature2": 0.6 }
        );
        console.log(response);
    } catch (error) {
        console.error("Errore: ", error);
    }
})();
```
**Descrizione:**
- `dataJson` (object): Dataset con feature per il modello di regressione.
- `columnPrediction` (string): Nome della colonna target da predire.
- `itemDict` (object): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

