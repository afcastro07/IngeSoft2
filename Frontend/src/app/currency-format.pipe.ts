import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currency: string = 'COP'): string {
    if (value == null) return '';

    // Convertir el número a un string y reemplazar el separador de miles
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' ' + currency;
  }

}
