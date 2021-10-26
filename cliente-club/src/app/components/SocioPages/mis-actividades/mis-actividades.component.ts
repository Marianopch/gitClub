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

}
