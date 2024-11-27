import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasarelaService {
  private apiUrlUsuario = `${environment.BASE_PATH}/api/usuario/`; 
  private apiUrlPoliza = `${environment.BASE_PATH}/api/poliza/`; 
  private apiVehiculo = `${environment.BASE_PATH}/api/vehiculo/`; 



  constructor(private http: HttpClient) { }


    crearUsuario(usuario: any): Observable<any> {
        return this.http.post(this.apiUrlUsuario, usuario);
    }

    crearPoliza(poliza: any): Observable<any> {
        return this.http.post(this.apiUrlPoliza, poliza);
    }

    crearVehiculo(vehiculo: any): Observable<any> {
        return this.http.post(this.apiVehiculo, vehiculo);
    }



}
