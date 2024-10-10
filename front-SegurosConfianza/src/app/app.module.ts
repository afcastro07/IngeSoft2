import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Importa FormsModule si usas [(ngModel)]
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';  // Importa el componente
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent  // Declara el componente aquí
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule  // Asegúrate de importar FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }