
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  // private apiUrl = 'http://34.57.207.46/api/facecolda/';  // URL de tu API
  private apiUrl = '';  // URL de tu API
  

  constructor(private http: HttpClient) { }

  // Método para obtener las marcas
  getFacecolda(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Aquí estamos devolviendo el Observable
  
  }
}