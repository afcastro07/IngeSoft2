import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasarelaService } from './pasarela.service';
import { ParametrosService } from '../cotizador/parametrosService';
import { RedirectCommand, Router } from '@angular/router';

@Component({
  selector: 'app-pasarela',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.css'],
})
export class PasarelaPagoComponent {
  @Input() nombre: any;
  @Input() apellido: any;
  @Input() tipoDocumento: any;
  @Input() numeroDocumento: any;
  @Input() telefono: any;
  @Input() direccion: any;
  @Input() correo: any;
  @Input() valorAPagar: any;
  
  @Input() tipoVehiculo: any;
  @Input() marca: any;
  @Input() modelo: any;
  @Input() anio: any;
  @Input() placa: any;
  @Input() tipoCoberturaVehiculo: any;
  @Input() numeroPoliza: any;


  @Input() tipoPago: any;
  @Input() nombreTarjeta: string = '';
  @Output() close = new EventEmitter<void>();




  showPopup: boolean = false;

  constructor(private PasarelaService: PasarelaService, private parametrosService: ParametrosService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse a los valores del servicio
    this.parametrosService.numeroPoliza$.subscribe(numeroPoliza => this.numeroPoliza = numeroPoliza);
  }

  onClose(): void {
    this.close.emit();
  }

  

  onRealizarPago(): void {


    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based
      const day = date.getDate().toString().padStart(2, '0'); // pad single digits with leading zero
      return `${year}-${month}-${day}`;
    };
    
    const formatDateTime = (date: Date): string => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based
      const day = date.getDate().toString().padStart(2, '0'); // pad single digits with leading zero
      const hours = date.getHours().toString().padStart(2, '0'); // hours in 24-hour format
      const minutes = date.getMinutes().toString().padStart(2, '0'); // minutes
      const seconds = date.getSeconds().toString().padStart(2, '0'); // seconds
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
    

    const dataUsuario = {
      n_identificacion: this.numeroDocumento,
      tipo_identificacion: this.tipoDocumento,
      nombre: this.nombre,
      correo: this.correo,
      telefono: this.telefono,
      direccion: this.direccion,
      contraseña: this.numeroPoliza,
      fecha_registro: formatDateTime(new Date()),
    }

    const dataPoliza = {
      identificacion_cliente: this.numeroDocumento,
      tipo_cobertura: this.tipoCoberturaVehiculo,
      valor_asegurado: this.valorAPagar,
      fecha_inicio: formatDate(new Date()),
      fecha_fin: formatDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1))),
      estado: 'activa',
    }

    const dataVehiculo = {
      identificacion_cliente: this.numeroDocumento,
      tipo_vehiculo: this.tipoVehiculo,
      marca_vehiculo: this.marca,
      modelo_vehiculo: this.modelo,
      anio_vehiculo: this.anio,
      placa_vehiculo: this.placa,
    }

    console.log(dataUsuario);
    console.log(dataPoliza);
    console.log(dataVehiculo);

  //llamar al servicio de pasarela
    this.PasarelaService.crearUsuario(dataUsuario).subscribe(
      response => {
        this.PasarelaService.crearPoliza(dataPoliza).subscribe(
          response => {
            this.PasarelaService.crearVehiculo(dataVehiculo).subscribe(
              response => {
                console.log('Todo creado correctamente', response);
              }, error => {
                console.error('Error al crear el vehículo', error);
              })
            }, error => {
              console.error('Error al crear la poliza', error);
            })
          }, error => {
            console.error('Error al crear el usuario', error);
      })

      /* Redirigir a pdf */
      this.router.navigate(['/pagocompletado']);


    
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' COP';
  }

  closePopup(): void {
    this.showPopup = false;
  }
}