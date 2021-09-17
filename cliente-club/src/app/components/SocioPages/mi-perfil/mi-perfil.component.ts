import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuarios: any = [];
  user = { Numero_Usuario: "", Nombre_Usuario: "", Apellido_Usuario: "", DNI_Usuario: "", Mail_Usuario: "", Telefono_Usuario: "", Direccion_Usuario: "", Password_Usuario: "", Id_Rol: "2", Id_Estado: "1" };

  constructor(private sociosService: SociosService, private router: Router) { }

  ngOnInit(): void {
    let Numero_Usuario = localStorage.getItem('Usuario');

    this.sociosService.buscarDatosSocio(Numero_Usuario).subscribe(
      res => {
        let result: any = res;
        this.usuarios = res;
        console.log(result);
      },
      err => console.log(err)
    )
  }
}
