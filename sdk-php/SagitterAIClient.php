<?php

class SagitterAIClient {
    private $apiToken;
    private $baseUrl;

    public function __construct($apiToken) {
        $this->apiToken = $apiToken;
        $this->baseUrl = "https://api.sagitterai.com/api/v1";
    }

    public function generateTableRecommendation($dataJson, $userCol, $itemCol, $ratingCol, $topK) {
        $data = [
            "data_json" => $dataJson,
            "user_col" => $userCol,
            "item_col" => $itemCol,
            "rating_col" => $ratingCol,
            "top_k" => $topK
        ];
        return $this->post("/generate_table_recommendation", $data);
    }

    public function generateUserRecommendation($dataJson, $userCol, $itemCol, $ratingCol, $userToRecommend, $topK) {
        $data = [
            "data_json" => $dataJson,
            "user_col" => $userCol,
            "item_col" => $itemCol,
            "rating_col" => $ratingCol,
            "user_to_reccomend" => $userToRecommend,
            "top_k" => $topK
        ];
        return $this->post("/generate_user_recommendation", $data);
    }

    public function generatePrediction($dataJson, $columnPrediction, $itemDict) {
        $data = [
            "data_json" => $dataJson,
            "column_prediction" => $columnPrediction,
            "item_dict" => $itemDict
        ];
        return $this->post("/generate_prediction", $data);
    }

    private function post($endpoint, $data) {
        $url = $this->baseUrl . $endpoint;
        $options = [
            "http" => [
                "header" => "Authorization: Bearer " . $this->apiToken . "\r\n" .
                             "Content-Type: application/json\r\n",
                "method" => "POST",
                "content" => json_encode($data)
            ]
        ];
        $context = stream_context_create($options);
        $result = file_get_contents($url, false, $context);
        return json_decode($result, true);
    }
}
?>
