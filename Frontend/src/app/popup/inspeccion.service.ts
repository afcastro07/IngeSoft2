import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService {
  private apiUrl = 'http://127.0.0.1:8000/api/projects/inspeccion/'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para crear una nueva inspección
  crearInspeccion(inspeccion: any): Observable<any> {
    return this.http.post(this.apiUrl, inspeccion);
  }

  getValor(marca: string, referencia: string, ano: string): Observable<number> {
    const url = `${this.apiUrl}?marca=${marca}&referencia=${referencia}&ano=${ano}`;
    return this.http.get<number>(url);
  }
}
