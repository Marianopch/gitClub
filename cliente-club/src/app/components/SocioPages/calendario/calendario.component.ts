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
  claseTotal = { Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: "", Id_Dias: "" }

  desc_clase = {Descripcion_Actividad: ""}

  clasesCalendar: any = [];

  infoClase: any = [];


  constructor(private sociosService: SociosService, private router: Router) { }


  ngOnInit(): void {
    this.cargarClases();
  }


  BuscarClase(){
    this.sociosService.llenarCalendar(this.desc_clase).subscribe(
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

  inscribirse(Id_Clase: any) {

    let Numero_Usuario = localStorage.getItem("Usuario");

    let envioDatos: any = [Id_Clase, Numero_Usuario];

    this.sociosService.inscribirSocio(envioDatos).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);

      },
      err => {
        console.log(err.error.message);

      }
    )
  }




}
