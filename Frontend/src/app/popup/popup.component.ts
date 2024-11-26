import { Component, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InspeccionService } from './inspeccion.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {

  @Input() nombreCliente: string = '';
  @Input() apellidoCliente: string = '';
  @Input() correoCliente: string = '';
  @Input() celularCliente: string = '';
  @Input() tipoVehiculo: string = '';
  @Input() numeroIdentificacionCliente: string = '';
  
  @Input() marcaVehiculo: string = '';
  @Input() modeloVehiculo: string = '';
  @Input() anioVehiculo: string = '';
  @Input() tipoCoberturaVehiculo: string = '';
  @Input() valorSeguro: number = 0;
  @Input() numeroPoliza: string = '';
  @Input() placaVehiculo: string = '';
  
  @Output() close = new EventEmitter<void>();
  @Output() buy = new EventEmitter<void>();
  @Input() fechaInspeccion: string = '';
  @Input() horaInspeccion: string = '';
  @Input() isCotizacion: boolean = true; 
  @Input() lugarSeleccionado: string = '';
  
  valorSeguroFormatted: string = '';

  constructor(private router: Router, private inspeccionService: InspeccionService) {}

  onClose(): void {
    this.close.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Call the formatValorSeguro method if valorSeguro changes
    if (changes['valorSeguro']) {
      this.formatValorSeguro();
    }
  }

  

  formatValorSeguro() {
    
    this.valorSeguroFormatted = this.valorSeguro.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });

    // If the value is greater than or equal to 1 million, replace commas with apostrophes
    if (this.valorSeguro >= 1000000) {
      this.valorSeguroFormatted = this.valorSeguroFormatted.replace(',', "'");
    }

    console.log('Formatted value:', this.valorSeguroFormatted);
  }

  // Finalizar inspección
  finalizarInspeccion(): void {
    const inspeccion = {
      placa: this.placaVehiculo,
      fecha: this.fechaInspeccion,
      hora: this.horaInspeccion,
      lugar: this.lugarSeleccionado,
      clienteId: this.numeroIdentificacionCliente,
      estado: 'Pendiente',
    };

    console.log('Inspección:', inspeccion);

    // // Llamar al servicio para enviar la solicitud POST
    // this.inspeccionService.crearInspeccion(inspeccion).subscribe(
    //   response => {
    //     console.log('Inspección registrada exitosamente', response);
    //     alert('La inspección ha sido registrada exitosamente.');
    //     this.router.navigate(['/inspeccion']);
    //   },
    //   error => {
    //     console.error('Error al registrar la inspección', error);
    //     alert('Hubo un error al registrar la inspección.');
    //   }
    // );
  }

  finalizarCompra(): void {
    if (this.placaVehiculo && this.placaVehiculo.trim() !== '') {
      this.router.navigate(['/inspeccion']);
    } else {
      this.router.navigate(['/checkout']);
    }
  }
}