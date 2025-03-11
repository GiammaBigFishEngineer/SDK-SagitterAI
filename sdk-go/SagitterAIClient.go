package sagitterai

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
)

type Client struct {
	BaseURL   string
	APIToken  string
	HTTPClient *http.Client
}

func NewClient(apiToken string) *Client {
	return &Client{
		BaseURL:   "https://api.sagitterai.com/api/v1",
		APIToken:  apiToken,
		HTTPClient: &http.Client{},
	}
}

func (c *Client) post(endpoint string, data interface{}) (map[string]interface{}, error) {
	url := fmt.Sprintf("%s%s", c.BaseURL, endpoint)
	jsonData, err := json.Marshal(data)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.APIToken))
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("API request failed")
	}

	var result map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func (c *Client) GenerateTableRecommendation(data map[string]interface{}) (map[string]interface{}, error) {
	return c.post("/generate_table_recommendation", data)
}

func (c *Client) GenerateUserRecommendation(data map[string]interface{}) (map[string]interface{}, error) {
	return c.post("/generate_user_recommendation", data)
}
