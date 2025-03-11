using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class SagitterAIClient
{
    private readonly string _apiToken;
    private readonly string _baseUrl;
    private readonly HttpClient _httpClient;

    public SagitterAIClient(string apiToken)
    {
        _apiToken = apiToken;
        _baseUrl = "https://api.sagitterai.com/api/v1";
        _httpClient = new HttpClient();
        _httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + _apiToken);
    }

    public async Task<string> GenerateTableRecommendationAsync(object dataJson, string userCol, string itemCol, string ratingCol, int topK)
    {
        var data = new
        {
            data_json = dataJson,
            user_col = userCol,
            item_col = itemCol,
            rating_col = ratingCol,
            top_k = topK
        };
        return await PostAsync("/generate_table_recommendation", data);
    }

    public async Task<string> GenerateUserRecommendationAsync(object dataJson, string userCol, string itemCol, string ratingCol, int userToRecommend, int topK)
    {
        var data = new
        {
            data_json = dataJson,
            user_col = userCol,
            item_col = itemCol,
            rating_col = ratingCol,
            user_to_reccomend = userToRecommend,
            top_k = topK
        };
        return await PostAsync("/generate_user_recommendation", data);
    }

    public async Task<string> GeneratePredictionAsync(object dataJson, string columnPrediction, object itemDict)
    {
        var data = new
        {
            data_json = dataJson,
            column_prediction = columnPrediction,
            item_dict = itemDict
        };
        return await PostAsync("/generate_prediction", data);
    }

    private async Task<string> PostAsync(string endpoint, object data)
    {
        var jsonContent = JsonConvert.SerializeObject(data);
        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        var response = await _httpClient.PostAsync(_baseUrl + endpoint, content);
        return await response.Content.ReadAsStringAsync();
    }
}