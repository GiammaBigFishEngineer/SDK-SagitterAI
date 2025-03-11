const axios = require('axios');

class SagitterAIClient {
    /**
     * SDK Client per interagire con l'API di SagitterAI
     * @param {string} apiToken - Token API dell'utente
     * @param {string} baseUrl - URL di base dell'API
     */
    constructor(apiToken, baseUrl = "https://api.sagitterai.com/api/v1") {
        this.apiToken = apiToken;
        this.baseUrl = baseUrl;
        this.headers = { 'Authorization': `Bearer ${this.apiToken}`, 'Content-Type': 'application/json' };
    }

    async generateTableRecommendation(dataJson, userCol, itemCol, ratingCol, topK) {
        return this._post('/generate_table_recommendation', { data_json: dataJson, user_col: userCol, item_col: itemCol, rating_col: ratingCol, top_k: topK });
    }

    async generateUserRecommendation(dataJson, userCol, itemCol, ratingCol, userToRecommend, topK) {
        return this._post('/generate_user_recommendation', { data_json: dataJson, user_col: userCol, item_col: itemCol, rating_col: ratingCol, user_to_reccomend: userToRecommend, top_k: topK });
    }

    async generatePrediction(dataJson, columnPrediction, itemDict) {
        return this._post('/generate_prediction', { data_json: dataJson, column_prediction: columnPrediction, item_dict: itemDict });
    }

    async _post(endpoint, data) {
        try {
            const response = await axios.post(`${this.baseUrl}${endpoint}`, data, { headers: this.headers });
            return response.data;
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = SagitterAIClient;
