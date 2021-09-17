import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-agregar-clase',
  templateUrl: './agregar-clase.component.html',
  styleUrls: ['./agregar-clase.component.css']
})
export class AgregarClaseComponent implements OnInit {


  clase = {Id_Actividad: "", Id_Horario: "", Cupo_Clase: "", Numero_Usuario: "", Id_Dias: ""};

  actividades: any = [];
  act = { Id_Actividad: "", descripcion: "" };

  instructor: any = [];
  ins = {Id_Instructor:"" , Nombre_Usuario: "", Apellido_Usuario: "", Numero_Usuario: ""};
 
  horarios: any = [];
  hora = { Id_Horario: "", Comienzo_Horario: "" , Finalizacion_Horario: ""};

  dias: any = [];
  dia = { Id_dias: "", Nombre_dias: "" };
  diasSelect : any = [];

  reintentar: boolean = false;
  mensaje: string = "";


  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.cargartodo();
  }



  cargartodo(){
    this.cargarAct();
    this.cargarIns();
    this.cargarHorarios();
    this.cargarDias();
  }



  cargarAct(){
    this.usuariosService.listarActividad().subscribe(
      res => {
        this.actividades = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarIns(){
    this.usuariosService.listarInstructor().subscribe(
      res => {
        this.instructor = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarHorarios(){
    this.usuariosService.listarHorarios().subscribe(
      res => {
        this.horarios = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  cargarDias(){
    this.usuariosService.listarDias().subscribe(
      res => {
        this.dias = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  AgregarCompleto(){
    this.AgregarClase();
    this.AgregarDias();
  }

  AgregarClase(){
    console.log(this.clase)

    this.usuariosService.agregarClase(this.clase).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        // this.router.navigate(['admin/home']);
        
      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }

      
    )
  }

  AgregarDias(){
    console.log(this.clase)

    this.usuariosService.agregarClase(this.diasSelect).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        
      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }
    )
  }

  onCheckboxChange(e: any) {

    if (e.target.checked) {

      this.diasSelect.push(new FormControl(e.target.value));

    } else {

       const index = this.diasSelect.controls.findIndex((x: { value: any; }) => x.value === e.target.value);

       this.diasSelect.removeAt(index);

    }

  }

}