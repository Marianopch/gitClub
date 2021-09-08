import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-admin',
  templateUrl: './buscar-admin.component.html',
  styleUrls: ['./buscar-admin.component.css']
})
export class BuscarAdminComponent implements OnInit {

  usuarios: any = [];
  user = { Numero_Usuario: "", Nombre_Usuario: "", Apellido_Usuario: "", DNI_Usuario: "", Mail_Usuario: "", Telefono_Usuario: "", Direccion_Usuario: "", Password_Usuario: "", Id_Rol: "2", Id_Estado: "1" };
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarAdmin().subscribe(
      res => {
         this.usuarios = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }

  eliminarUser(Numero_Usuario: any) {

    console.log(this.usuarios)
    this.usuariosService.eliminarAdmin(Numero_Usuario).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['admin/home']);
      },
      error => {
        console.log(error);
        this.router.navigate(['admin/agregarAdmin']);
      });
  }

  modificarUser(usuario: any) {
    console.log(usuario);
    this.usuariosService.actualizarAdmin(usuario.Numero_Usuario, usuario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err)
    )
  }

}
