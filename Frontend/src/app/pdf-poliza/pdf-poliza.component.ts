import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pdf-poliza',
  templateUrl: './pdf-poliza.component.html',
  styleUrls: ['./pdf-poliza.component.css']
})
export class PdfPolizaComponent {

  // Example form data to fill the PDF
  cliente = {
    nombre: 'Cesar Andres Ferreira',
    identificacion: '79797958',
    correo: 'cesar@example.com',
    telefono: '3122122',
  };

  vehiculo = {
    placa: 'LIU500',
    marca: 'JETOUR',
    modelo: 'X70 SPORT',
    color: 'Gris',
    anio: '2023',
    tipo: 'Camioneta de Pasajeros',
  };

  seguro = {
    valorAsegurado: 96470000,
    valorAccesorios: 170000,
    totalAsegurado: 96470000 + 170000,
    numeroPoliza: '2023-0001',
    fechaInicio: '2023-01-01',
    fechaFin: '2024-01-01',
  };

  finalizar(): void {
   close();
  }

  generatePdf(): void {
    const doc = new jsPDF();

    // Set font for the entire document
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // Title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Póliza de Seguro", 20, 20);

    // Draw border around the content area
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);  // Draw rectangle

    // Client Information Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Datos del Asegurado", 20, 40);

    // Client Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Nombre: ${this.cliente.nombre}`, 20, 50);
    doc.text(`Identificación: ${this.cliente.identificacion}`, 20, 60);
    doc.text(`Correo: ${this.cliente.correo}`, 20, 70);
    doc.text(`Teléfono: ${this.cliente.telefono}`, 20, 80);

    // Vehicle Information Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Detalles del Vehículo Asegurado", 20, 100);

    // Vehicle Information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Placa: ${this.vehiculo.placa}`, 20, 110);
    doc.text(`Marca: ${this.vehiculo.marca}`, 20, 120);
    doc.text(`Modelo: ${this.vehiculo.modelo}`, 20, 130);
    doc.text(`Color: ${this.vehiculo.color}`, 20, 140);
    doc.text(`Año: ${this.vehiculo.anio}`, 20, 150);
    doc.text(`Tipo: ${this.vehiculo.tipo}`, 20, 160);

    // Insurance Details Header
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 255);  // Blue for headers
    doc.text("Detalles del Seguro", 20, 180);

    // Insurance Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);  // Reset color to black
    doc.text(`Valor Asegurado: $${this.seguro.valorAsegurado.toLocaleString()}`, 20, 190);
    doc.text(`Valor Accesorios: $${this.seguro.valorAccesorios.toLocaleString()}`, 20, 200);
    doc.text(`Total Asegurado: $${this.seguro.totalAsegurado.toLocaleString()}`, 20, 210);

    // Policy Number and Dates
    doc.setFontSize(12);
    doc.text(`Número de Póliza: ${this.seguro.numeroPoliza}`, 20, 220);
    doc.text(`Fecha de Inicio: ${this.seguro.fechaInicio}`, 20, 230);
    doc.text(`Fecha de Vencimiento: ${this.seguro.fechaFin}`, 20, 240);

    // Footer
    doc.setFontSize(10);
    doc.text('Seguros Comerciales Bolívar S.A.', 20, 260);
    doc.text('Página 1 de 1', 180, 260);

    // Save the PDF
    doc.save(`Poliza_Seguro_${this.seguro.numeroPoliza}.pdf`);
  }
}