import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService {
  private apiUrl = `${environment.BASE_PATH}/api/inspeccion/`; // Cambia la URL si es necesario
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
