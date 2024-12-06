import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private apiUrl = 'https://comicvine.gamespot.com/api/issues/';
  private apiKey = '456b46f2645e1b045f867e769f12320e7860a6ac';

  constructor(private http: HttpClient) {}

  getComics(): Observable<any> {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}&format=json`);
  }
}
