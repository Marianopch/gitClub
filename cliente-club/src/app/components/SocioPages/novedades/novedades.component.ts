import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  constructor(private sociosService: SociosService) { }

  buscarTexto= "";
  comentarios: any = [];
  comentario = { Titulo_Comentario: "", Descripcion_Comentario: "", Imagen_Comentario: "", Numero_Usuario: localStorage.getItem('Usuario')};
  nroUsuario = localStorage.getItem('Usuario');
  id_Rol = localStorage.getItem('Rol');
  errorComentario = 0;
  errorImagen = 0;
  userName= "";

  ngOnInit(): void {
    this.sociosService.listarComentarios().subscribe(
      res => {
        this.comentarios = res;
        console.log(res)

      },
      err => console.log(err)
    )
  }

}
