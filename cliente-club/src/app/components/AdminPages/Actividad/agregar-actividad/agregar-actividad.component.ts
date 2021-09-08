import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.css']
})
export class AgregarActividadComponent implements OnInit {

  act = {  descripcion: "" };

  reintentar: boolean = false;
  mensaje: string = "";

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
		
    console.log(this.act)
    
    this.usuariosService.guardarActividad(this.act).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        this.router.navigate(['admin/home']);
        
      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }
    )
	}

  recargarForm() {
    this.reintentar = false;
    this.mensaje = "";
  }


}
