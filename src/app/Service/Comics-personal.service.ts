import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicsPersonalService {
  private apiUrl = 'http://localhost:3000/comics'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  getAllComics(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createComic(comic: any): Observable<any> {
    return this.http.post(this.apiUrl, comic);
  }

  updateComic(id: number, comic: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, comic);
  }

  deleteComic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
