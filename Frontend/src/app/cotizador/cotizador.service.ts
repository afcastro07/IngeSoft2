
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  private apiUrl = 'http://localhost:8000/api/facecolda/';  // URL de tu API
  

  constructor(private http: HttpClient) { }

  // Método para obtener las marcas
  getFacecolda(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Aquí estamos devolviendo el Observable
  
  }
}