import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  private nombreClienteSource = new BehaviorSubject<string>(''); // Nombre del cliente
  private apellidoClienteSource = new BehaviorSubject<string>(''); // Apellido del cliente
  private correoClienteSource = new BehaviorSubject<string>(''); // Correo del cliente
  private celularClienteSource = new BehaviorSubject<string>(''); // Celular del cliente
  private tipoVehiculoSource = new BehaviorSubject<string>(''); // Tipo de vehículo
  private placaVehiculoSource = new BehaviorSubject<string>(''); // Placa del vehículo
  private marcaVehiculoSource = new BehaviorSubject<string>(''); // Marca del vehículo
  private modeloVehiculoSource = new BehaviorSubject<string>(''); // Modelo del vehículo
  private anioVehiculoSource = new BehaviorSubject<string>(''); // Año del vehículo
  private tipoCoberturaSource = new BehaviorSubject<string>(''); // Tipo de cobertura
  private valorSeguroSource = new BehaviorSubject<number>(0); // Valor del seguro
  private numeroPolizaSource = new BehaviorSubject<string>(''); // Número de póliza


// Métodos para obtener los datos

    nombreCliente$ = this.nombreClienteSource.asObservable();
    apellidoCliente$ = this.apellidoClienteSource.asObservable();
    correoCliente$ = this.correoClienteSource.asObservable();
    celularCliente$ = this.celularClienteSource.asObservable();
    tipoVehiculo$ = this.tipoVehiculoSource.asObservable();
    placaVehiculo$ = this.placaVehiculoSource.asObservable();
    marcaVehiculo$ = this.marcaVehiculoSource.asObservable();
    modeloVehiculo$ = this.modeloVehiculoSource.asObservable();
    anioVehiculo$ = this.anioVehiculoSource.asObservable();
    tipoCobertura$ = this.tipoCoberturaSource.asObservable();
    valorSeguro$ = this.valorSeguroSource.asObservable();
    numeroPoliza$ = this.numeroPolizaSource.asObservable();


// Métodos para actualizar los datos

    setNombreCliente(nombre: string) {
      this.nombreClienteSource.next(nombre);
    }
  
    setApellidoCliente(apellido: string) {
      this.apellidoClienteSource.next(apellido);
    }

    setCorreoCliente(correo: string) {
      this.correoClienteSource.next(correo);
    }

    setCelularCliente(celular: string) {
      this.celularClienteSource.next(celular);
    }

    setTipoVehiculo(tipo: string) {
      this.tipoVehiculoSource.next(tipo);
    }

    setPlacaVehiculo(placa: string) {
      this.placaVehiculoSource.next(placa);
    }

    setMarcaVehiculo(marca: string) {
      this.marcaVehiculoSource.next(marca);
    }

    setModeloVehiculo(modelo: string) {
      this.modeloVehiculoSource.next(modelo);
    }

    setAnioVehiculo(anio: string) {
      this.anioVehiculoSource.next(anio);
    }

    setTipoCobertura(tipo: string) {
      this.tipoCoberturaSource.next(tipo);
    }

    setValorSeguro(valor: number) {
      this.valorSeguroSource.next(valor);
    }

    setNumeroPoliza(numero: string) {
      this.numeroPolizaSource.next(numero);
    }

    

}