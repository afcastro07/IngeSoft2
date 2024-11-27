import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { provideHttpClient } from '@angular/common/http';
import { InspeccionComponent } from './inspeccion/inspeccion.component';
import { pagoComponent } from './pago/pago.component';
import { PdfPolizaComponent } from './pdf-poliza/pdf-poliza.component';
import { loginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'cotizar', component: CotizadorComponent },
  { path: 'inspeccion', component: InspeccionComponent },
  { path: 'checkout', component: pagoComponent },
  { path: 'pagocompletado', component: PdfPolizaComponent },
  { path: 'login', component: loginComponent },
  
];