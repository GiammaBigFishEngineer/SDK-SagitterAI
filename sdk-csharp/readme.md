# SagitterAI C# SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- .NET Core 3.1+
- Pacchetto `Newtonsoft.Json` per la gestione dei JSON

## Installazione
Aggiungere il pacchetto JSON al progetto:

### Con .NET CLI
```bash
dotnet add package Newtonsoft.Json
```

### Con NuGet Package Manager
```powershell
Install-Package Newtonsoft.Json
```

## Utilizzo

### Inizializzazione del Client
```csharp
var client = new SagitterAIClient("your_api_token_here");
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```csharp
var dataJson = new
{
    user_id = new int[] { 1, 2, 3 },
    item_id = new int[] { 101, 102, 103 },
    rating = new int[] { 5, 4, 3 }
};

var response = await client.GenerateTableRecommendationAsync(dataJson, "user_id", "item_id", "rating", 5);
Console.WriteLine(response);
```
**Descrizione:**
- `dataJson` (object): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```csharp
var response = await client.GenerateUserRecommendationAsync(dataJson, "user_id", "item_id", "rating", 1, 5);
Console.WriteLine(response);
```
**Descrizione:**
- `dataJson` (object): Dataset contenente interazioni utente-elemento.
- `userCol` (string): Nome della colonna utenti.
- `itemCol` (string): Nome della colonna elementi.
- `ratingCol` (string): Nome della colonna con i punteggi.
- `userToRecommend` (int): ID utente per cui generare le raccomandazioni.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```csharp
var itemDict = new { feature2 = 0.6 };

var response = await client.GeneratePredictionAsync(dataJson, "feature1", itemDict);
Console.WriteLine(response);
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

