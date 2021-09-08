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
        this.router.navigate(['admin/home']);
      },
      error => {
        console.log(error);
        this.router.navigate(['admin/agregarActividad']);
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

}
