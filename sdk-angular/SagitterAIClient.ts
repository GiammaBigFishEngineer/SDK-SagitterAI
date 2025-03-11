import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SagitterAIClient {
  private baseUrl = 'https://api.sagitterai.com/api/v1';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  setToken(apiToken: string) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    });
  }

  generateTableRecommendation(dataJson: any, userCol: string, itemCol: string, ratingCol: string, topK: number): Observable<any> {
    const data = { data_json: dataJson, user_col: userCol, item_col: itemCol, rating_col: ratingCol, top_k: topK };
    return this.http.post(`${this.baseUrl}/generate_table_recommendation`, data, { headers: this.headers });
  }

  generateUserRecommendation(dataJson: any, userCol: string, itemCol: string, ratingCol: string, userToRecommend: number, topK: number): Observable<any> {
    const data = { data_json: dataJson, user_col: userCol, item_col: itemCol, rating_col: ratingCol, user_to_reccomend: userToRecommend, top_k: topK };
    return this.http.post(`${this.baseUrl}/generate_user_recommendation`, data, { headers: this.headers });
  }

  generatePrediction(dataJson: any, columnPrediction: string, itemDict: any): Observable<any> {
    const data = { data_json: dataJson, column_prediction: columnPrediction, item_dict: itemDict };
    return this.http.post(`${this.baseUrl}/generate_prediction`, data, { headers: this.headers });
  }
}