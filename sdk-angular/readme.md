# SagitterAI Angular SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- Angular 12+
- Modulo `HttpClient` di Angular
- RxJS per la gestione delle richieste HTTP asincrone

## Installazione
Assicurarsi che `HttpClientModule` sia importato nel modulo principale:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

## Utilizzo

### Inizializzazione del Client
```typescript
import { SagitterAIClient } from './sagitter-ai-client.service';

constructor(private sagitterClient: SagitterAIClient) {
  this.sagitterClient.setToken('your_api_token_here');
}
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```typescript
const dataJson = {
  user_id: [1, 2, 3],
  item_id: [101, 102, 103],
  rating: [5, 4, 3]
};

this.sagitterClient.generateTableRecommendation(dataJson, 'user_id', 'item_id', 'rating', 5)
  .subscribe(response => {
    console.log(response);
  }, error => {
    console.error('Errore:', error);
  });
```
**Descrizione:**
- `dataJson` (any): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `topK` (number): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```typescript
this.sagitterClient.generateUserRecommendation(dataJson, 'user_id', 'item_id', 'rating', 1, 5)
  .subscribe(response => {
    console.log(response);
  }, error => {
    console.error('Errore:', error);
  });
```
**Descrizione:**
- `dataJson` (any): Dataset contenente interazioni utente-elemento.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `userToRecommend` (number): ID utente per cui generare le raccomandazioni.
- `topK` (number): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```typescript
const itemDict = { feature2: 0.6 };

this.sagitterClient.generatePrediction(dataJson, 'feature1', itemDict)
  .subscribe(response => {
    console.log(response);
  }, error => {
    console.error('Errore:', error);
  });
```
**Descrizione:**
- `dataJson` (any): Dataset con feature per il modello di regressione.
- `columnPrediction` (string): Nome della colonna target da predire.
- `itemDict` (any): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.
- Le chiamate API sono asincrone e devono essere gestite con RxJS.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

