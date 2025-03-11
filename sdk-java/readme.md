# SagitterAI Java SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- Java 8+
- Libreria `org.json` per la gestione dei JSON

## Installazione
Aggiungere la libreria JSON al progetto:

### Con Maven
```xml
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20210307</version>
</dependency>
```

### Con Gradle
```gradle
dependencies {
    implementation 'org.json:json:20210307'
}
```

## Utilizzo

### Inizializzazione del Client
```java
SagitterAIClient client = new SagitterAIClient("your_api_token_here");
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```java
JSONObject dataJson = new JSONObject();
dataJson.put("user_id", new int[]{1, 2, 3});
dataJson.put("item_id", new int[]{101, 102, 103});
dataJson.put("rating", new int[]{5, 4, 3});

JSONObject response = client.generateTableRecommendation(dataJson, "user_id", "item_id", "rating", 5);
System.out.println(response.toString());
```
**Descrizione:**
- `dataJson` (JSONObject): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (String): Nome della colonna utenti.
- `itemCol` (String): Nome della colonna elementi.
- `ratingCol` (String): Nome della colonna con i punteggi.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```java
JSONObject response = client.generateUserRecommendation(dataJson, "user_id", "item_id", "rating", 1, 5);
System.out.println(response.toString());
```
**Descrizione:**
- `dataJson` (JSONObject): Dataset contenente interazioni utente-elemento.
- `userCol` (String): Nome della colonna utenti.
- `itemCol` (String): Nome della colonna elementi.
- `ratingCol` (String): Nome della colonna con i punteggi.
- `userToRecommend` (int): ID utente per cui generare le raccomandazioni.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```java
JSONObject itemDict = new JSONObject();
itemDict.put("feature2", 0.6);

JSONObject response = client.generatePrediction(dataJson, "feature1", itemDict);
System.out.println(response.toString());
```
**Descrizione:**
- `dataJson` (JSONObject): Dataset con feature per il modello di regressione.
- `columnPrediction` (String): Nome della colonna target da predire.
- `itemDict` (JSONObject): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

