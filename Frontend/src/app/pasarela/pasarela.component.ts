import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.css'],
})
export class PasarelaPagoComponent {
  @Input() cliente: any;
  @Input() vehiculo: any;
  @Input() pago: any;
  @Output() close = new EventEmitter<void>(); 

  showPopup: boolean = false;

  constructor() {}

  onClose(): void {
    this.close.emit();
  }

  onRealizarPagoPasarela(): void {
    console.log("Realizando pago con tarjeta", this.pago);
    // Lógica para enviar los datos a la API de pago
  }

  formatCurrency(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' COP';
  }

  closePopup(): void {
    this.showPopup = false;
  }
}