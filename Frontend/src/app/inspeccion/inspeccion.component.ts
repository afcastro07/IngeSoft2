import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { PopupComponent } from '../popup/popup.component'; // Adjust the path as necessary
import { FormsModule } from '@angular/forms';
import { ParametrosService } from '../cotizador/parametrosService';
import { InspeccionService } from '../popup/inspeccion.service';



@Component({
  selector: 'app-inspeccion',
  standalone: true,
  imports: [NgFor, PopupComponent, CommonModule, FormsModule],
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.css']
})
export class InspeccionComponent implements OnInit {
  selectedMarca: string = '';
  selectedReferencia: string = '';
  selectedAno: string = '';
  valorAPagar: number = 0;
  nombreCliente: string = '';
  placaVehiculo: string = '';
  horasDisponibles: string[] = [];
  numeroIdentificacionCliente: string = '';
  fechaSeleccionada: string = '';
  horaSeleccionada: string = '';
  lugarSeleccionado: string = '';

  constructor(private parametrosService: ParametrosService, private inspeccionService: InspeccionService) {}
  

  ngOnInit(): void {
    this.parametrosService.nombreCliente$.subscribe(nombre => {
      this.nombreCliente = nombre;
    });
    this.parametrosService.placaVehiculo$.subscribe(placa => {
      this.placaVehiculo = placa;
    });

  }


  // Función para obtener la fecha mínima (fecha actual)
  getMinFecha(): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // Formato yyyy-mm-dd
  }

  // Función para actualizar las horas disponibles
  actualizarHorasDisponibles(): void {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Domingo = 0, Lunes = 1, ..., Sábado = 6

    // Horas disponibles de lunes a sábado (7 AM - 5 PM)
    const horasLunesASabado = [
      '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    // Horas disponibles en domingo (8 AM - 4 PM)
    const horasDomingo = [
      '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
      '2:00 PM', '3:00 PM', '4:00 PM'
    ];

    // Dependiendo del día, seleccionamos las horas disponibles
    if (dayOfWeek === 0) { // Domingo
      this.horasDisponibles = horasDomingo;
    } else { // Lunes a Sábado
      this.horasDisponibles = horasLunesASabado;
    }
  }

  // Función para manejar el envío del formulario
  agendarInspeccion(): void {
    if(this.selectedMarca && this.selectedReferencia && this.selectedAno && this.valorAPagar > 0 && this.nombreCliente && this.placaVehiculo && this.fechaSeleccionada && this.horaSeleccionada && this.lugarSeleccionado) {
      console.log('Inspección agendada: ', {
        numeroIdentificacionCliente: this.numeroIdentificacionCliente,
        placa: this.placaVehiculo,
        fecha: this.fechaSeleccionada,
        hora: this.horaSeleccionada,
        lugar: this.lugarSeleccionado
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  getvalorAPagar(): void {
    if (this.selectedMarca && this.selectedReferencia && this.selectedAno) {
      this.inspeccionService.getValor(this.selectedMarca, this.selectedReferencia, this.selectedAno)
        .subscribe((valor: number) => {
          this.valorAPagar = valor;
        });
    } else {
      this.valorAPagar = 0;
    }
  }
}