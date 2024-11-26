import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../cotizador/parametrosService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  standalone: true,
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
    telefonoCliente: '',
    direccion: '',
    correoCliente: '',
    valorAPagar: 0,
    termsAccepted: false,
    privacyAccepted: false
  };

  // Datos del vehículo
  vehiculo = {
    marcaVehiculo: '',
    modeloVehiculo: '',
    anioVehiculo: '',
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
    this.parametrosService.nombreCliente$.subscribe(nombre => {
      this.cliente.nombre = nombre;
    });
    this.parametrosService.apellidoCliente$.subscribe(apellido => {
      this.cliente.apellido = apellido;
    });
    this.parametrosService.correoCliente$.subscribe(telefonoCliente => {
      this.cliente.telefonoCliente = telefonoCliente;
    });
    this.parametrosService.correoCliente$.subscribe(correoCliente => {
      this.cliente.correoCliente = correoCliente;
    });
    this.parametrosService.marcaVehiculo$.subscribe(marcaVehiculo => {
      this.vehiculo.marcaVehiculo = marcaVehiculo;
    });
    this.parametrosService.modeloVehiculo$.subscribe(modeloVehiculo => {
      this.vehiculo.modeloVehiculo = modeloVehiculo;
    });
    this.parametrosService.anioVehiculo$.subscribe(anioVehiculo => {
      this.vehiculo.anioVehiculo = anioVehiculo;
    });
    
  }

  // Método para manejar el envío del pago
  onSubmitForm() {
    console.log("Enviando pago", this.cliente.valorAPagar, this.cliente.correoCliente);  
    this.showPopup = true;

    // Enviar los datos a la pasarela de pago
    this.parametrosService.setNombreCliente(this.cliente.nombre);

  }

  closePopup(): void {
    this.showPopup = false; // Ocultar el popup
  }
}