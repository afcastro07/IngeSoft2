import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { ParametrosService } from '../cotizador/parametrosService';

@Component({
  selector: 'app-pdf-poliza',
  templateUrl: './pdf-poliza.component.html',
  styleUrls: ['./pdf-poliza.component.css']
})
export class PdfPolizaComponent implements OnInit {
  @Input() nombre: string = '';
  @Input() apellido: string = '';
  @Input() tipoDocumento: string = '';
  @Input() numeroDocumento: string = '';
  @Input() telefono: string = '';
  @Input() direccion: string = '';
  @Input() correo: string = '';
  @Input() valorAPagar: number = 0;
  @Input() tipoVehiculo: string = '';
  @Input() marca: string = '';
  @Input() modelo: string = '';
  @Input() anio: string = '';
  @Input() placa: string = '';
  @Input() tipoCoberturaVehiculo: string = '';
  @Input() numeroPoliza: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  constructor(private parametrosService: ParametrosService, private router: Router) {}
  

  ngOnInit(): void {
    this.parametrosService.nombreCliente$.subscribe(nombre => this.nombre = nombre);
    this.parametrosService.apellidoCliente$.subscribe(apellido => this.apellido = apellido);
    this.parametrosService.celularCliente$.subscribe(telefono => this.telefono = telefono);
    this.parametrosService.correoCliente$.subscribe(correo => this.correo = correo);
    this.parametrosService.valorSeguro$.subscribe(valorAPagar => this.valorAPagar = valorAPagar);
    this.parametrosService.tipoVehiculo$.subscribe(tipoVehiculo => this.tipoVehiculo = tipoVehiculo);
    this.parametrosService.marcaVehiculo$.subscribe(marca => this.marca = marca);
    this.parametrosService.modeloVehiculo$.subscribe(modelo => this.modelo = modelo);
    this.parametrosService.anioVehiculo$.subscribe(anio => this.anio = anio);
    this.parametrosService.placaVehiculo$.subscribe(placa => this.placa = placa);
    this.parametrosService.tipoCobertura$.subscribe(tipoCobertura => this.tipoCoberturaVehiculo = tipoCobertura);
    this.parametrosService.numeroPoliza$.subscribe(numeroPoliza => this.numeroPoliza = numeroPoliza);

    // Format dates when the component loads
    this.setFechaInicio();
    this.setFechaVencimiento();
  }

  // Format the date to 'yyyy-MM-dd'
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Set the initial and expiration dates
  setFechaInicio() {
    this.fechaInicio = this.formatDate(new Date());
  }

  setFechaVencimiento() {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1); // Set to next year
    this.fechaFin = this.formatDate(nextYear);
  }

  // Function to generate the PDF
  generatePdf(): void {
    const doc = new jsPDF();
  
    
    const logo = 'img/logo.png';  
    doc.addImage(logo, 'PNG', 10, 10, 100, 20);  
  
    // Add today's date at the top-right corner
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-CO', {  
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Black color
    doc.text(formattedDate, 170, 15);  // Position it at the top-right corner
  
    // Set font for the entire document
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Draw border around the content area
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);  // Draw rectangle
  
    // Insurance Details Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Detalles del Seguro", 20, 50);  // Adjusted position
  
    // Policy Number and Dates
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Número de Póliza: ${this.numeroPoliza}`, 20, 60);  // Adjusted position
    doc.text(`Fecha de Inicio: ${this.fechaInicio}`, 20, 70);  // Adjusted position
    doc.text(`Fecha de Vencimiento: ${this.fechaFin}`, 20, 80);  // Adjusted position
    
    // Client Information Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Datos del Asegurado", 20, 100);
  
    // Client Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Nombre: ${this.nombre} ${this.apellido}`, 20, 110);
    doc.text(`Correo: ${this.correo}`, 20, 130);
    doc.text(`Teléfono: ${this.telefono}`, 20, 140);
  
    // Vehicle Information Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Detalles del Vehículo Asegurado", 20, 160);
  
    // Vehicle Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Marca: ${this.marca}`, 20, 180);
    doc.text(`Modelo: ${this.modelo}`, 20, 190);
    doc.text(`Año: ${this.anio}`, 20, 200);
    doc.text(`Cobertura: ${this.tipoCoberturaVehiculo}`, 20, 210);
  
    // Footer
    doc.setFontSize(10);
    doc.text('Seguros Confianza S.A.', 20, 260);
    doc.text('Página 1 de 1', 180, 260);
  
    // Save the PDF
    doc.save(`Poliza_Seguro_${this.numeroPoliza}.pdf`);
  }

  finalizar(): void {
    // Redirect to the payment completed page
    this.router.navigate(['/cotizar']);
  }
}