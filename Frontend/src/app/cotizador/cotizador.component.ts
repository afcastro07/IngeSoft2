import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CotizadorService } from './cotizador.service';
import { CommonModule, NgFor } from '@angular/common';
import { PopupComponent } from '../popup/popup.component';
import { FormsModule } from '@angular/forms';
import { ParametrosService } from './parametrosService';

@Component({
  selector: 'app-cotizador',
  standalone: true,
  imports: [NgFor, PopupComponent, CommonModule, FormsModule],
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
})

export class CotizadorComponent implements OnInit {
  general: any[] = [];
  marcas: any[] = [];
  selectedMarca: string = '';
  modelos: string[] = [];

  showPopup: boolean = false;
  
  valorSeguro: number = 0;
  nombreCliente: string = '';
  apellidoCliente: string = '';
  celularCliente: string = '';
  correoCliente: string = ''

  tipoVehiculo: string = '';
  tienePlaca: boolean = false;
  placaVehiculo: string = '';
  marcaVehiculo: string = '';
  modeloVehiculo: string = '';
  anioVehiculo: string = '';
  tipoCobertura: string = '';

  valorAPagarFormatted: string = '';
  selectedTipoVehiculo: string = '';
  filteredMarcas: any[] | undefined;
  referencias: any[] = [];
  anosDisponibles: any[] = [];
  selectedReferencia: string = '';
  selectedAno: string = '';
  isCotizacion: boolean = false;
  numeroPoliza: string = '';

  constructor(private cotizadorService: CotizadorService, private parametrosService: ParametrosService) { }

  ngOnInit(): void {
    this.loadFacecolda(); // Llamar al método para cargar las marcas
  }

  loadFacecolda(): void {
    
    this.cotizadorService.getFacecolda().subscribe(
      (data) => {
        this.general = data; 
        
        const uniqueMarcasSet = new Set<string>(); // Usamos un Set para evitar duplicados
        this.general.forEach(item => {
          const marca = item.marca; 
          if (marca) { 
            uniqueMarcasSet.add(marca); 
          }
        });
        
        // Convertir el Set a un array
        this.marcas = Array.from(uniqueMarcasSet);
        
        // Ordenar las marcas alfabéticamente (en orden ascendente)
        this.marcas.sort((a, b) => a.localeCompare(b));
      },
      (error) => {
        console.error('Error al obtener las marcas', error); // Manejo de errores
      }
    );

  }

  onTipoVehiculoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedTipoVehiculo = target.value;

    this.numeroPoliza = this.generateRandomPolicyNumber();

    switch (this.selectedTipoVehiculo) {
      case 'Automovil':
        this.selectedTipoVehiculo = 'car';
        break;

      case 'Moto':
        this.selectedTipoVehiculo = 'motorcycle';
        break;

      case 'Carro Híbrido':
        this.selectedTipoVehiculo = 'hybrid';
        break;

      default:
        this.selectedTipoVehiculo = '';
        break;
    }

    this.filterMarcasByTipo();
  }

  filterMarcasByTipo() {
    if (this.selectedTipoVehiculo) {

      // Convertir el Set a un array
      this.filteredMarcas = Array.from(this.marcas); 
    }

  }
  
  getReferencias(): void {
    if (this.selectedMarca) {
      const allData: any[] = []; // Aquí vamos a almacenar todas las referencias encontradas
  
      this.general.forEach((item: any) => {
        // Verifica si 'marca' existe en el objeto y si coincide con 'selectedMarca'
        if (item.marca && item.marca.toLowerCase() === this.selectedMarca.toLowerCase()) {
          // Verifica si 'referencia1' existe y lo agrega a allData
          if (item.referencia1) {
            allData.push(item.referencia1);
          }
        }
      });
  
      // Usamos un Set para eliminar duplicados de las referencias
      this.referencias = Array.from(new Set(allData)); 
    } else {
      this.referencias = []; 
    }
  }

  changePlaca(): void{ 
    this.tienePlaca = !this.tienePlaca; 
    
  }


getAnosDisponibles(): void {
  if (this.selectedMarca && this.selectedReferencia) { 
    const allData: any[] = [];  // Aquí vamos a almacenar todas las referencias encontradas
    const allAños: string[] = [];  // Aquí vamos a almacenar todos los años disponibles

    this.general.forEach((item: any) => {
      if (item.marca && item.marca.toLowerCase() === this.selectedMarca.toLowerCase()) {

        // Agregar las referencias
        if (item.referencia1) {
          allData.push(item.referencia1);
        }

        // Obtener los años disponibles, del 1970 al 2025
        for (let year = 1970; year <= 2025; year++) {
          const yearKey = `_${year}`;
          if (item[yearKey] && item[yearKey] !== '0') {
            allAños.push(year.toString());
          }
        }
      }
    });

  

    // Eliminar duplicados y ordenar las referencias
    this.referencias = Array.from(new Set(allData));
    this.referencias.sort();  

    // Eliminar duplicados y ordenar los años
    this.anosDisponibles = Array.from(new Set(allAños));
    this.anosDisponibles.sort();  // Ordena los años

  } else {
    this.referencias = []; 
    this.anosDisponibles = [];  
  }

}

getvalorAPagar(): void {
  if (this.selectedMarca && this.selectedReferencia && this.selectedAno && this.tipoCobertura) {

    // Buscar el item que coincida con la marca y la referencia seleccionada
    const matchingItem = this.general.find(item =>
      item.marca === this.selectedMarca &&
      item.referencia1 === this.selectedReferencia
    );
    

    // Verifica que el item se haya encontrado y que la propiedad de año exista
    if (matchingItem) {
      const yearKey = `_${this.selectedAno}`;
  
      // Verifica si el año seleccionado existe en el objeto
      if (yearKey in matchingItem && matchingItem[yearKey] !== '0') {
        let valor = parseFloat(matchingItem[yearKey]); 
        
        
        if (valor === 0) {
          valor = 2500000; 
        }

        // Aplica incrementos según el tipo de cobertura
        if (this.tipoCobertura === 'media') {
          this.valorSeguro = valor * 1.10; 
        } else if (this.tipoCobertura === 'completa') {
          this.valorSeguro = valor * 1.15; 
        } else {
          this.valorSeguro = valor * 1.05; 
        }
          this.valorSeguro = this.valorSeguro * 1000
          this.valorAPagarFormatted = this.valorSeguro.toLocaleString('es-CO');


      } else {
        
        this.valorSeguro = 2500000; 
      }
    } else {
    
      this.valorSeguro = 2500000; 
    }
  } else {
    // Si no se seleccionan marca, referencia o año, asigna valor por defecto
    this.valorSeguro = 2500000; 
  }
}

generateRandomPolicyNumber(): string {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio de 5 dígitos
  return `${randomNumber}`;
}

onReferenciaChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.selectedReferencia = target.value; 

  this.getAnosDisponibles(); // Llama al método para obtener años disponibles
}

onMarcaChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedMarca = target.value; 
    this.anioVehiculo = '';
    this.tipoCobertura = '';

    // Llama al método para obtener referencias
    this.getReferencias();
 }

onAnoChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.selectedAno = target.value; 
  this.tipoCobertura = '';

  
}

onTipoCoberturaChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  this.tipoCobertura = target.value; 
  this.getvalorAPagar();
}
  
togglePlaca(): void {
  this.tienePlaca = !this.tienePlaca;
}

onCorreoBlur(): void {
  if (!this.validarCorreo()) {
    this.correoCliente = ''; 
   alert("Ingrese un correo válido");
  } else {
    
  }
}

validarCorreo(): boolean {
  const regex = /\S+@\S+\.\S+/; // Expresión regular para validar correo
  return regex.test(this.correoCliente); // Devuelve true si el correo es válido
}

onTelefonoBlur(): void {
  const regex = /^[0-9]+$/; // Expresión regular que valida solo números
  if (!regex.test(this.celularCliente)) {
    alert("Ingrese un número de teléfono válido");
    this.celularCliente = ''; 
  } else {
   
  }
}

// onCotizar(): void {

//   if(this.nombreCliente == '' || this.apellidoCliente == '' || this.tipoIdentificacionCliente == '' || this.numeroIdentificacionCliente == '' || this.celularCliente == '' || this.correoCliente == '' ||  this.selectedMarca == '' || this.selectedReferencia == '' || this.anioVehiculo == '' || this.tipoCobertura == '' || this.selectedTipoVehiculo == ''){
 
//     alert("Por favor llene todos los campos");
//   }else {
//     this.showPopup = true;
//     this.isCotizacion = true;

//     if (this.nombreCliente || this.apellidoCliente || this.tipoIdentificacionCliente || this.numeroIdentificacionCliente || this.placaVehiculo) {
//       this.parametrosService.setnombreCliente(this.nombreCliente);
//       this.parametrosService.setapellidoCliente(this.apellidoCliente);
//       this.parametrosService.setTipoIdentificacionCliente(this.tipoIdentificacionCliente);
//       this.parametrosService.setNumeroIdentificacionCliente(this.numeroIdentificacionCliente);
//       this.parametrosService.setPlaca(this.placaVehiculo);
//       this.parametrosService.setcelularCliente(this.celularCliente);
//       this.parametrosService.setcorreoCliente(this.correoCliente);
//       this.parametrosService.setMarcaVehiculo(this.selectedMarca);
//       this.parametrosService.setModeloVehiculo(this.selectedReferencia);
//       this.parametrosService.setAnioVehiculo(this.anioVehiculo);
//       this.parametrosService.setTipoCoberturaVehiculo(this.tipoCobertura);
//       this.parametrosService.setTipoVehiculo(this.selectedTipoVehiculo);
//       this.parametrosService.setvalorAPagar(this.valorSeguro);

//     }
//   }
// }
onCotizar(): void {

    this.showPopup = true;
    this.isCotizacion = true;

  if (this.nombreCliente || this.apellidoCliente || this.celularCliente || this.correoCliente || this.selectedMarca || this.selectedReferencia || this.anioVehiculo || this.tipoCobertura || this.selectedTipoVehiculo) {
    this.parametrosService.setNombreCliente(this.nombreCliente);
    this.parametrosService.setApellidoCliente(this.apellidoCliente);
    this.parametrosService.setCelularCliente(this.celularCliente);
    this.parametrosService.setCorreoCliente(this.correoCliente);
    this.parametrosService.setMarcaVehiculo(this.selectedMarca);
    this.parametrosService.setModeloVehiculo(this.selectedReferencia);
    this.parametrosService.setAnioVehiculo(this.anioVehiculo);
    this.parametrosService.setTipoCobertura(this.tipoCobertura);
    this.parametrosService.setTipoVehiculo(this.selectedTipoVehiculo);
    this.parametrosService.setValorSeguro(this.valorSeguro);
    this.parametrosService.setNumeroPoliza(this.numeroPoliza);
    this.parametrosService.setPlacaVehiculo(this.placaVehiculo);
  }

}

  closePopup(): void {
    this.showPopup = false; // Ocultar el popup
  }

  onBuy(): void {
  }

}