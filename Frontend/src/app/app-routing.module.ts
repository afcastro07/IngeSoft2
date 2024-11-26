import {Routes} from '@angular/router';
import {CotizadorComponent} from './cotizador/cotizador.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';

import { PdfPolizaComponent } from './pdf-poliza/pdf-poliza.component';
import { pagoComponent } from './pago/pago.component';

export const routes: Routes = [
  { path: 'cotizar', component: CotizadorComponent },
  { path: 'inspeccion', component: InspeccionComponent },
  { path: 'checkout', component: pagoComponent },
  { path: 'pagocompletado', component: PdfPolizaComponent },
  
];