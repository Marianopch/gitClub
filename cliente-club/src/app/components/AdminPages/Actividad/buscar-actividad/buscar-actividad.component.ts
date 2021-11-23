import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-actividad',
  templateUrl: './buscar-actividad.component.html',
  styleUrls: ['./buscar-actividad.component.css']
})
export class BuscarActividadComponent implements OnInit {

  actividades: any = [];
  act = { id: "", descripcion: "" };

  reintentar: boolean = false;

  mensaje: string = "";
  reintentar2: boolean = false;
  mensaje2: string = "";

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarActividad().subscribe(
      res => {
        this.actividades = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  eliminarAct(id: any) {

    console.log(this.actividades)
    this.usuariosService.eliminarActividad(id).subscribe(
      response => {
        console.log(response);
        let respuesta: any = response;
        this.mensaje = respuesta.message;
        this.ngOnInit();
        this.reintentar = false;
        this.reintentar2 = true;

      },
      error => {
        console.log(error.error.message);
        this.reintentar2 = false;
        this.reintentar = true;

        this.mensaje = error.error.message;
      });
  }

  modificarAct(actividad: any) {
    console.log(actividad);
    this.usuariosService.actualizarActividad(actividad.id, actividad).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

  //Agregar actividad
  registrar() {

    console.log(this.act)

    this.usuariosService.guardarActividad(this.act).subscribe(
      res => {
        let result: any = res;
        this.ngOnInit();
        this.resetModal();
        this.recargarForm();

      },
      err => {
        console.log(err.error.message);

        this.mensaje = err.error.message;
        this.resetModal();
      }
    )
  }

  recargarForm() {
    this.reintentar = false;
    this.mensaje = "";
  }

  resetModal() {
    this.act.descripcion = '';
    this.act.id = '';
  }


}

