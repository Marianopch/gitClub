import { Component, OnInit } from '@angular/core';
import { SociosService } from 'src/app/services/socios.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  usuarios: any = [];
  errorNumUs=0;
  errorNombre=0;
  errorApellido=0;
  errorDNI=0;
  errorMail=0;
  errorTel=0;
  errorDirec=0;
  errorPassword=0;

  reintentar: boolean = false;
  mensaje: string = "";
  user = { Numero_Usuario: "", Nombre_Usuario: "", Apellido_Usuario: "", DNI_Usuario: "", Mail_Usuario: "", Telefono_Usuario: "", Direccion_Usuario: "", Password_Usuario: "", Id_Rol: "2", Id_Estado: "1" };

  constructor(private sociosService: SociosService,private usuariosService: UsuariosService ,private router: Router) { }

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

  modificarUser(usuario: any) {
    console.log(usuario);
    this.usuariosService.actualizarUsuario(usuario.Numero_Usuario, usuario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }
}
