#include <iostream>
#include <curl/curl.h>
#include <json/json.h>

class SagitterAIClient {
public:
    SagitterAIClient(const std::string& apiToken) : apiToken(apiToken) {
        baseUrl = "https://api.sagitterai.com/api/v1";
    }

    std::string generateTableRecommendation(const Json::Value& dataJson, const std::string& userCol, const std::string& itemCol, const std::string& ratingCol, int topK) {
        Json::Value data;
        data["data_json"] = dataJson;
        data["user_col"] = userCol;
        data["item_col"] = itemCol;
        data["rating_col"] = ratingCol;
        data["top_k"] = topK;
        return post("/generate_table_recommendation", data);
    }

    std::string generateUserRecommendation(const Json::Value& dataJson, const std::string& userCol, const std::string& itemCol, const std::string& ratingCol, int userToRecommend, int topK) {
        Json::Value data;
        data["data_json"] = dataJson;
        data["user_col"] = userCol;
        data["item_col"] = itemCol;
        data["rating_col"] = ratingCol;
        data["user_to_reccomend"] = userToRecommend;
        data["top_k"] = topK;
        return post("/generate_user_recommendation", data);
    }

    std::string generatePrediction(const Json::Value& dataJson, const std::string& columnPrediction, const Json::Value& itemDict) {
        Json::Value data;
        data["data_json"] = dataJson;
        data["column_prediction"] = columnPrediction;
        data["item_dict"] = itemDict;
        return post("/generate_prediction", data);
    }

private:
    std::string apiToken;
    std::string baseUrl;

    std::string post(const std::string& endpoint, const Json::Value& data) {
        CURL* curl = curl_easy_init();
        if (!curl) return "Error initializing CURL";

        std::string url = baseUrl + endpoint;
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, ("Authorization: Bearer " + apiToken).c_str());
        headers = curl_slist_append(headers, "Content-Type: application/json");
        
        std::string response;
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data.toStyledString().c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        return response;
    }

    static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* output) {
        size_t totalSize = size * nmemb;
        output->append((char*)contents, totalSize);
        return totalSize;
    }
};