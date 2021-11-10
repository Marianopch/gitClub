import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';

@Component({
  selector: 'app-home-socio',
  templateUrl: './home-socio.component.html',
  styleUrls: ['./home-socio.component.css']
})
export class HomeSocioComponent implements OnInit {

  constructor(private sociosService: SociosService) { }

  comentarios: any = [];

  ngOnInit(): void {
    this.sociosService.listarUltimosComentarios().subscribe(
      res => {
        this.comentarios = res;
        console.log(res)

      },
      err => console.log(err)
    )
  }

}
