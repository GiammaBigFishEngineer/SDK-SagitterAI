import requests

class SagitterAIClient:
    """
    SDK Client per interagire con l'API di SagitterAI.
    """
    def __init__(self, api_token: str, base_url: str = "https://api.sagitterai.com/api/v1"):
        self.api_token = api_token
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {self.api_token}", "Content-Type": "application/json"}

    def generate_table_recommendation(self, data_json: dict, user_col: str, item_col: str, rating_col: str, top_k: int):
        """Genera una tabella di raccomandazione."""
        data = {"data_json": data_json, "user_col": user_col, "item_col": item_col, "rating_col": rating_col, "top_k": top_k}
        return self._post("/generate_table_recommendation", data)

    def generate_user_recommendation(self, data_json: dict, user_col: str, item_col: str, rating_col: str, user_to_recommend: int, top_k: int):
        """Genera raccomandazioni per un singolo utente."""
        data = {"data_json": data_json, "user_col": user_col, "item_col": item_col, "rating_col": rating_col, "user_to_reccomend": user_to_recommend, "top_k": top_k}
        return self._post("/generate_user_recommendation", data)

    def generate_prediction(self, data_json: dict, column_prediction: str, item_dict: dict):
        """Genera una predizione basata su modelli di regressione."""
        data = {"data_json": data_json, "column_prediction": column_prediction, "item_dict": item_dict}
        return self._post("/generate_prediction", data)

    def _post(self, endpoint: str, data: dict):
        """Metodo interno per inviare richieste POST."""
        url = f"{self.base_url}{endpoint}"
        response = requests.post(url, json=data, headers=self.headers)
        return response.json()
