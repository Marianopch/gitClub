import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {

actividades:any =[];
reintentar: boolean = false;
mensaje: string = "";

  constructor(private sociosService:SociosService , private router: Router) { }

  ngOnInit(): void {
    let Numero_Usuario = localStorage.getItem('Usuario');

    this.sociosService.ListarSocioActividades(Numero_Usuario).subscribe(
      res => {
        this.actividades = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  eliminarClase(id: any) {

    let Numero_Usuario = localStorage.getItem('Usuario');

    this.sociosService.eliminarClase(id, Numero_Usuario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();

      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }
    )
  }

}
