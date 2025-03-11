# SagitterAI Go SDK Client

## Descrizione
Questo SDK permette di interagire con l'API di SagitterAI per generare raccomandazioni e predizioni basate su modelli di machine learning.

## Requisiti
- Go 1.16+
- Modulo `net/http` per richieste HTTP
- Modulo `encoding/json` per la gestione dei JSON

## Installazione

Aggiungere il pacchetto al proprio progetto:
```bash
go mod init sagitterai_client
go mod tidy
```

## Utilizzo

### Inizializzazione del Client
```go
package main

import (
	"fmt"
	"sagitterai"
)

func main() {
	client := sagitterai.NewClient("your_api_token_here")
	fmt.Println("SagitterAI Client Inizializzato!")
}
```

## Metodi Disponibili

### 1. Generazione di una Tabella di Raccomandazione
```go
package main

import (
	"fmt"
	"sagitterai"
)

func main() {
	client := sagitterai.NewClient("your_api_token_here")

data := map[string]interface{}{
	"data_json": map[string]interface{}{
		"user_id": []int{1, 2, 3},
		"item_id": []int{101, 102, 103},
		"rating": []int{5, 4, 3},
	},
	"user_col": "user_id",
	"item_col": "item_id",
	"rating_col": "rating",
	"top_k": 5,
}

response, err := client.GenerateTableRecommendation(data)
if err != nil {
	fmt.Println("Errore:", err)
	return
}
fmt.Println(response)
}
```
**Descrizione:**
- `data` (map[string]interface{}): Dataset contenente interazioni utente-elemento con punteggi.

---

### 2. Generazione di Raccomandazioni per un Utente Specifico
```go
response, err := client.GenerateUserRecommendation(data)
if err != nil {
	fmt.Println("Errore:", err)
	return
}
fmt.Println(response)
```
**Descrizione:**
- `data` (map[string]interface{}): Dataset contenente interazioni utente-elemento.

## Note
- Assicurarsi di utilizzare un `apiToken` valido per autenticarsi all'API.
- L'API restituisce una risposta in formato JSON.

## Licenza
Questo progetto è distribuito sotto la licenza MIT.

