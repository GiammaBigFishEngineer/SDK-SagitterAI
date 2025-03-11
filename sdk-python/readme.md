# SagitterAI SDK Client

## Descrizione
Questo SDK consente di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Installazione

### Requisiti
- Python 3.7+
- Modulo `requests` installato

### Installazione delle dipendenze
```bash
pip install requests
```

## Utilizzo

### Inizializzazione del Client
```python
from sagitterai_client import SagitterAIClient

api_token = "your_api_token_here"
client = SagitterAIClient(api_token)
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```python
response = client.generate_table_recommendation(
    data_json={"user_id": [1, 2, 3], "item_id": [101, 102, 103], "rating": [5, 4, 3]},
    user_col="user_id",
    item_col="item_id",
    rating_col="rating",
    top_k=5
)
print(response)
```
**Descrizione:**
- `data_json` (dict): Dataset contenente le interazioni utente-elemento con punteggi.
- `user_col` (str): Nome della colonna utenti.
- `item_col` (str): Nome della colonna elementi.
- `rating_col` (str): Nome della colonna con i punteggi.
- `top_k` (int): Numero di raccomandazioni da restituire.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```python
response = client.generate_user_recommendation(
    data_json={"user_id": [1, 2, 3], "item_id": [101, 102, 103], "rating": [5, 4, 3]},
    user_col="user_id",
    item_col="item_id",
    rating_col="rating",
    user_to_recommend=1,
    top_k=5
)
print(response)
```
**Descrizione:**
- `data_json` (dict): Dataset contenente interazioni utente-elemento.
- `user_col` (str): Nome della colonna utenti.
- `item_col` (str): Nome della colonna elementi.
- `rating_col` (str): Nome della colonna con i punteggi.
- `user_to_recommend` (int): ID utente per cui generare le raccomandazioni.
- `top_k` (int): Numero di raccomandazioni da restituire.

---

### 3. Generazione di una Predizione
```python
response = client.generate_prediction(
    data_json={"feature1": [10, 20, 30], "feature2": [0.5, 0.7, 0.2]},
    column_prediction="feature1",
    item_dict={"feature2": 0.6}
)
print(response)
```
**Descrizione:**
- `data_json` (dict): Dataset con feature per il modello di regressione.
- `column_prediction` (str): Nome della colonna target da predire.
- `item_dict` (dict): Dizionario con le feature per cui calcolare la predizione.

## Note
- Assicurarsi di utilizzare un `api_token` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

