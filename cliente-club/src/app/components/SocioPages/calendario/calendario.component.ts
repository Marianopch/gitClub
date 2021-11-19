import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {

  clasesTotales: any = [];
  claseTotal = { Descripcion_Actividad: ""}

  desc_clase = { Descripcion_Actividad: "" }

  clasesCalendar: any = [];
  claseCalendar = { Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: "", Id_Dias: "", Clase: "" }

  infoClase: any = [];
  reintentar: boolean = false;
  mensaje: string = "";
  reintentar2: boolean = false;
  mensaje2: string = "";

  constructor(private sociosService: SociosService, private router: Router) { }


  ngOnInit(): void {
    this.cargarClases();
  }


  BuscarClase(){
    this.sociosService.llenarCalendar(this.desc_clase.Descripcion_Actividad).subscribe(
      res => {
        this.clasesCalendar = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  cargarClases() {
    this.sociosService.clasesTotales().subscribe(
      res => {
        this.clasesTotales = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


  buscarDatosClase(Id_Clase: any) {

    console.log(Id_Clase);
    this.sociosService.buscarClase(Id_Clase).subscribe(
      res => {
        let result: any = res;
        this.infoClase = res;
        console.log(result);
      },
      err => console.log(err)
    )
  }

  inscribirse(Id_Clase: any, Comienzo_Horario: any) {

    let Numero_Usuario = localStorage.getItem("Usuario");

    let envioDatos: any = [Id_Clase, Numero_Usuario, Comienzo_Horario];

    this.sociosService.inscribirSocio(envioDatos).subscribe(
      res => {
        let result: any = res;
        console.log(result);
        this.reintentar = false;
        this.reintentar2 = true;
        this.mensaje = "";
        this.mensaje2 = result.message;

      },
      err => {
        console.log(err.error.message);
         this.reintentar = true;
         this.reintentar2 = false;
         this.mensaje2 = "";
         this.mensaje = err.error.message;

      }
    )
  }




}
