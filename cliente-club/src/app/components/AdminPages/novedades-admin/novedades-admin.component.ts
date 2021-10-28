import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-novedades-admin',
  templateUrl: './novedades-admin.component.html',
  styleUrls: ['./novedades-admin.component.css']
})
export class NovedadesAdminComponent implements OnInit {

  constructor(private usuariosService: UsuariosService ) { }

  buscarTexto= "";
  comentarios: any = [];
  comentario = { Titulo_Comentario: "", Descripcion_Comentario: "", Imagen_Comentario: "", Numero_Usuario: localStorage.getItem('Usuario')};
  nroUsuario = localStorage.getItem('Usuario');
  id_Rol = localStorage.getItem('rol');
  errorComentario = 0;
  errorImagen = 0;
  userName= "";

  
  ngOnInit(): void {
    this.usuariosService.listarComentarios().subscribe(
      res => {
        this.comentarios = res;
        console.log(this.id_Rol);
        console.log(res);
        this.limpiarComentario();
        this.limpiarImagen();

      },
      err => console.log(err)
    )
  }

  crearComentario(){
    console.log(this.comentario);
    this.usuariosService.guardarComentarios(this.comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => {
        console.log(err.error.message);
      }
    )
  }

  eliminar(comentario: any) {
    this.usuariosService.eliminarComentarios(comentario).subscribe(
      res => {
        let result: any = res;
        console.log(result.message);
        this.ngOnInit();
      },
      err => console.log(err.error.message)
    )
  }

  // filtrar(buscarTexto: any) {
  //   console.log(buscarTexto);
  //   this.usuariosService.filtrarUser(buscarTexto).subscribe(
  //     res => {
  //       console.log(buscarTexto);
  //       this.comentarios = res;
  //       console.log(res)

  //     },
  //     err => console.log(err)
  //   )
  // }

  verificarComentario(com: string) {
    if (com.length == 0)
      return 1;
    if (com.length > 1000)
      return 2;
    return 0;
  }

  verificarImagen(img: string) {
   
    return 0;
  }

  verificarForm(): boolean {
    this.errorComentario = this.verificarComentario(this.comentario.Descripcion_Comentario);
    this.errorImagen = this.verificarImagen(this.comentario.Imagen_Comentario);
    if (this.errorComentario + this.errorImagen > 0) {
      return false;
    }
    return true;
  }

  limpiarComentario() {
    if (this.errorComentario > 0) {
      console.log("Limpiar descripcion");
      this.comentario.Descripcion_Comentario = "";
      this.errorComentario = 0;
    }

  }

  limpiarImagen() {
    if (this.errorImagen > 0) {
      console.log("Limpiar imagen");
      this.comentario.Imagen_Comentario = "";
      this.errorImagen = 0;
    }

  }

  EnableDisable(this: any){
    let btnSubmit = document.getElementById("btnSubmit");
    this.btnSubmit.disabled = false;
  }
}
