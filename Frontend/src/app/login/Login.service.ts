import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class LoginService {
  private apiUrl = `${environment.BASE_PATH}/api/usuario/login/`;  // URL de tu API
  
  

  constructor(private http: HttpClient) { }

    login(correo: string, contraseña: string): Observable<any> {
        return this.http.post(this.apiUrl, { correo, contraseña });
    }
}