import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-clase',
  templateUrl: './buscar-clase.component.html',
  styleUrls: ['./buscar-clase.component.css']
})
export class BuscarClaseComponent implements OnInit {

  clases: any = [];
  clase = {Id_Clase: "", Descripcion_Actividad: "", Nombre_Usuario: "", Apellido_Usuario: "", Cupo_Clase: "" }

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {

    this.usuariosService.listarClase().subscribe(
      res => {
        this.clases = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }


}
