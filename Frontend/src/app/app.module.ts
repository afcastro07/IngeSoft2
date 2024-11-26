import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { PopupComponent } from './popup/popup.component';
import { InspeccionComponent } from './inspeccion/inspeccion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CotizadorComponent,
    PopupComponent,
    InspeccionComponent
    // Otros componentes
  ],
  imports: [
    BrowserModule,
    RouterModule, // Importa RouterModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
