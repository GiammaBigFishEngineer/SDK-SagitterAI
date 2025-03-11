# SagitterAI C++ SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- C++11 o superiore
- Libreria `libcurl` per le richieste HTTP
- Libreria `jsoncpp` per la gestione dei JSON

## Installazione
### Installare `libcurl` e `jsoncpp`
Su Debian/Ubuntu:
```bash
sudo apt install libcurl4-openssl-dev libjsoncpp-dev
```
Su macOS:
```bash
brew install curl jsoncpp
```
Su Windows, è necessario scaricare e compilare le librerie manualmente.

## Compilazione
```bash
g++ -o sagitterai_client main.cpp -lcurl -ljsoncpp
```

## Utilizzo

### Inizializzazione del Client
```cpp
#include "SagitterAIClient.h"

SagitterAIClient client("your_api_token_here");
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```cpp
Json::Value dataJson;
dataJson["user_id"][0] = 1;
dataJson["user_id"][1] = 2;
dataJson["user_id"][2] = 3;
dataJson["item_id"][0] = 101;
dataJson["item_id"][1] = 102;
dataJson["item_id"][2] = 103;
dataJson["rating"][0] = 5;
dataJson["rating"][1] = 4;
dataJson["rating"][2] = 3;

std::string response = client.generateTableRecommendation(dataJson, "user_id", "item_id", "rating", 5);
std::cout << response << std::endl;
```
**Descrizione:**
- `dataJson` (Json::Value): Dataset contenente interazioni utente-elemento con punteggi.
- `userCol` (std::string): Nome della colonna utenti.
- `itemCol` (std::string): Nome della colonna elementi.
- `ratingCol` (std::string): Nome della colonna con i punteggi.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```cpp
std::string response = client.generateUserRecommendation(dataJson, "user_id", "item_id", "rating", 1, 5);
std::cout << response << std::endl;
```
**Descrizione:**
- `dataJson` (Json::Value): Dataset contenente interazioni utente-elemento.
- `userCol` (std::string): Nome della colonna utenti.
- `itemCol` (std::string): Nome della colonna elementi.
- `ratingCol` (std::string): Nome della colonna con i punteggi.
- `userToRecommend` (int): ID utente per cui generare le raccomandazioni.
- `topK` (int): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```cpp
Json::Value itemDict;
itemDict["feature2"] = 0.6;

std::string response = client.generatePrediction(dataJson, "feature1", itemDict);
std::cout << response << std::endl;
```
**Descrizione:**
- `dataJson` (Json::Value): Dataset con feature per il modello di regressione.
- `columnPrediction` (std::string): Nome della colonna target da predire.
- `itemDict` (Json::Value): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

