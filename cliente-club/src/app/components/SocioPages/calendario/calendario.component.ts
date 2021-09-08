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
  claseLu = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesMa: any = [];
  claseMa = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}
  
  clasesMi: any = [];
  claseMi = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesJu: any = [];
  claseJu = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

  clasesVi: any = [];
  claseVi = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}
 
  clasesSa: any = [];
  claseSa = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}  
  
  clasesDo: any = [];
  claseDo = {Descripcion_Actividad: "", Comienzo_Horario: "", Finalizacion_Horario: ""}

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

}
