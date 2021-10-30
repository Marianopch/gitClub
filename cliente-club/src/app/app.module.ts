import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/AdminPages/home/home.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsuariosService } from './services/usuarios.service';
import { BuscarSocioComponent } from './components/AdminPages/Socios/buscar-socio/buscar-socio.component';
import { AgregarSocioComponent } from './components/AdminPages/Socios/agregar-socio/agregar-socio.component';
import { AuthGuard } from './auth.guard';
import { SociosService } from './services/socios.service';
import { AgregarAdminComponent } from './components/AdminPages/Admin/agregar-admin/agregar-admin.component'; 
import { BuscarAdminComponent } from './components/AdminPages/Admin/buscar-admin/buscar-admin.component';
import { BuscarActividadComponent } from './components/AdminPages/Actividad/buscar-actividad/buscar-actividad.component';
import { AgregarActividadComponent } from './components/AdminPages/Actividad/agregar-actividad/agregar-actividad.component';
import { BuscarInstructorComponent } from './components/AdminPages/Instructores/buscar-instructor/buscar-instructor.component';
import { AgregarInstructorComponent } from './components/AdminPages/Instructores/agregar-instructor/agregar-instructor.component';
import { InscribirseComponent } from './components/SocioPages/inscribirse/inscribirse.component';
import { HomeSocioComponent } from './components/SocioPages/home-socio/home-socio.component';
import { BuscarClaseComponent } from './components/AdminPages/Clases/buscar-clase/buscar-clase.component';
import { AgregarClaseComponent } from './components/AdminPages/Clases/agregar-clase/agregar-clase.component';
import { CalendarioComponent } from './components/SocioPages/calendario/calendario.component';


import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MiPerfilComponent } from './components/SocioPages/mi-perfil/mi-perfil.component';
import { NovedadesComponent } from './components/SocioPages/novedades/novedades.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { MisActividadesComponent } from './components/SocioPages/mis-actividades/mis-actividades.component';
import { NovedadesAdminComponent } from './components/AdminPages/novedades-admin/novedades-admin.component';
import { ClasesPipe } from './pipes/clases.pipe';
import {TokenInterceptorService} from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    BuscarSocioComponent,
    AgregarSocioComponent,
    AgregarAdminComponent,
    BuscarAdminComponent,
    BuscarActividadComponent,
    AgregarActividadComponent,
    BuscarInstructorComponent,
    AgregarInstructorComponent,
    InscribirseComponent,
    HomeSocioComponent,
    BuscarClaseComponent,
    AgregarClaseComponent,
    CalendarioComponent,
    MiPerfilComponent,
    NovedadesComponent,
    FiltroPipe,
    FooterComponent,
    MisActividadesComponent,
    NovedadesAdminComponent,
    ClasesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [
    UsuariosService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    SociosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
