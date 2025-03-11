import java.net.HttpURLConnection;
import java.net.URL;
import java.io.OutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONObject;

public class SagitterAIClient {
    private String apiToken;
    private String baseUrl;

    public SagitterAIClient(String apiToken) {
        this.apiToken = apiToken;
        this.baseUrl = "https://api.sagitterai.com/api/v1";
    }

    public JSONObject generateTableRecommendation(JSONObject dataJson, String userCol, String itemCol, String ratingCol, int topK) throws Exception {
        JSONObject data = new JSONObject();
        data.put("data_json", dataJson);
        data.put("user_col", userCol);
        data.put("item_col", itemCol);
        data.put("rating_col", ratingCol);
        data.put("top_k", topK);
        return post("/generate_table_recommendation", data);
    }

    public JSONObject generateUserRecommendation(JSONObject dataJson, String userCol, String itemCol, String ratingCol, int userToRecommend, int topK) throws Exception {
        JSONObject data = new JSONObject();
        data.put("data_json", dataJson);
        data.put("user_col", userCol);
        data.put("item_col", itemCol);
        data.put("rating_col", ratingCol);
        data.put("user_to_reccomend", userToRecommend);
        data.put("top_k", topK);
        return post("/generate_user_recommendation", data);
    }

    public JSONObject generatePrediction(JSONObject dataJson, String columnPrediction, JSONObject itemDict) throws Exception {
        JSONObject data = new JSONObject();
        data.put("data_json", dataJson);
        data.put("column_prediction", columnPrediction);
        data.put("item_dict", itemDict);
        return post("/generate_prediction", data);
    }

    private JSONObject post(String endpoint, JSONObject data) throws Exception {
        URL url = new URL(baseUrl + endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Authorization", "Bearer " + apiToken);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        OutputStream os = conn.getOutputStream();
        os.write(data.toString().getBytes());
        os.flush();
        os.close();

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return new JSONObject(response.toString());
    }
}