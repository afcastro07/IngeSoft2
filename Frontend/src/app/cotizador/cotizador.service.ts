
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  private apiUrl = `${environment.BASE_PATH}/api/facecolda`;  // URL de tu API
  
  

  constructor(private http: HttpClient) { }

  // Método para obtener las marcas
  getFacecolda(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Aquí estamos devolviendo el Observable
  
  }
}