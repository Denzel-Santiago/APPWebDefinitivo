import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resena } from '../../interfaces/Resena'; // Asegúrate de crear este archivo

@Injectable({
  providedIn: 'root',
})
export class ResenasService {
  private apiUrl = 'http://localhost:3000/resenas'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todas las reseñas
  getAllResenas(): Observable<Resena[]> {
    return this.http.get<Resena[]>(this.apiUrl);
  }

  // Obtener una reseña por ID
  getResenaById(id: number): Observable<Resena> {
    return this.http.get<Resena>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva reseña
  createResena(resena: Resena): Observable<Resena> {
    return this.http.post<Resena>(this.apiUrl, resena);
  }

  // Actualizar una reseña
  updateResena(id: number, resena: Resena): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, resena);
  }

  // Eliminar una reseña
  deleteResena(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
