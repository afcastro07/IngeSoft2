import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../cotizador/parametrosService';
import { PasarelaPagoComponent} from '../pasarela/pasarela.component';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [NgFor, PasarelaPagoComponent, CommonModule, FormsModule],
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class pagoComponent implements OnInit {

  showPopup: boolean = false;

  // Datos del cliente
  cliente = {
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    direccion: '',
    correo: '',
    valorAPagar: 0,
    termsAccepted: false,
    privacyAccepted: false,
    numeroPoliza: ''
  };

  // Datos del vehículo
  vehiculo = {
    tipoVehiculo: '',
    marca: '',
    modelo: '',
    anio: '',
    placa: '',
    tipoCoberturaVehiculo: ''
  };

  // Datos de pago
  pago = {
    tipoPago: ''
  };

  constructor(private parametrosService: ParametrosService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse a los valores del servicio
    this.parametrosService.nombreCliente$.subscribe(nombre => this.cliente.nombre = nombre);
    this.parametrosService.apellidoCliente$.subscribe(apellido => this.cliente.apellido = apellido);
    this.parametrosService.correoCliente$.subscribe(correo => this.cliente.correo = correo);
    this.parametrosService.celularCliente$.subscribe(telefono => this.cliente.telefono = telefono);
    this.parametrosService.tipoVehiculo$.subscribe(tipo => this.vehiculo.tipoVehiculo = tipo);
    this.parametrosService.placaVehiculo$.subscribe(placa => this.vehiculo.placa = placa);
    this.parametrosService.marcaVehiculo$.subscribe(marca => this.vehiculo.marca = marca);
    this.parametrosService.modeloVehiculo$.subscribe(modelo => this.vehiculo.modelo = modelo);
    this.parametrosService.anioVehiculo$.subscribe(anio => this.vehiculo.anio = anio);
    this.parametrosService.tipoCobertura$.subscribe(tipoCobertura => this.vehiculo.tipoCoberturaVehiculo = tipoCobertura);
    this.parametrosService.valorSeguro$.subscribe(valor => this.cliente.valorAPagar = valor);
    this.parametrosService.numeroPoliza$.subscribe(numeroPoliza => this.cliente.numeroPoliza = numeroPoliza);
    
  }

  pasarelaOpen(): void {
    console.log("Abriendo pasarela de pago");
    this.showPopup = true; 
  }

  closePopup(): void {
    this.showPopup = false; // Ocultar el popup
  }
}