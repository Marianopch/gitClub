import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})

export class CalendarioComponent implements OnInit {

  clasesLu: any = [];
  claseLu = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesMa: any = [];
  claseMa = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}
  
  clasesMi: any = [];
  claseMi = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesJu: any = [];
  claseJu = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesVi: any = [];
  claseVi = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}
 
  clasesSa: any = [];
  claseSa = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: "", Numero_Usuario: ""}  
  
  clasesDo: any = [];
  claseDo = {Id_Clase: "", Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  infoClase: any = [];


  constructor(private sociosService: SociosService, private router: Router) { }

  viewDate: Date = new Date();

  ngOnInit(): void {

    this.cargarClases();
  }  

  cargarClases(){
    this.cargarClaseLu();
    this.cargarClaseMa();
    this.cargarClaseMi();
    this.cargarClaseJu();
    this.cargarClaseVi();
    this.cargarClaseSa();
    this.cargarClaseDo();
  }

  cargarClaseLu(){
    this.sociosService.clasesLu().subscribe(
      res => {
        this.clasesLu = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseMa(){
    this.sociosService.clasesMa().subscribe(
      res => {
        this.clasesMa = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseMi(){
    this.sociosService.clasesMi().subscribe(
      res => {
        this.clasesMi = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseJu(){
    this.sociosService.clasesJu().subscribe(
      res => {
        this.clasesJu = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseVi(){
    this.sociosService.clasesVi().subscribe(
      res => {
        this.clasesVi = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseSa(){
    this.sociosService.clasesSa().subscribe(
      res => {
        this.clasesSa = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarClaseDo(){
    this.sociosService.clasesDo().subscribe(
      res => {
        this.clasesDo = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  buscarDatosClase(Id_Clase: any){

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


}
