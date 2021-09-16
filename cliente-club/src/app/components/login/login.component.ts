import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = { Numero_Usuario: "", Password_Usuario: "" };
  reintentar: boolean = false;
  mensaje: string = "";


  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.user)
    this.usuariosService.ingresar(this.user).subscribe(
      res => {
        let result: any = res;
        console.log(result);
        
        localStorage.setItem('rol', result.rol);
        localStorage.setItem('token', result.token);
        localStorage.setItem('Usuario', this.user.Numero_Usuario);
        //this.router.navigate(['admin/home']);
        
        this.usuariosService.loged$.emit();

        if (result.rol == 1) {
          this.usuariosService.admin_.emit();
          // console.log(result);
          this.router.navigate(['admin/home'])
        }
        else{
          this.usuariosService.user$.emit();
          this.router.navigate(['socio/home']);
        }

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
    this.user.Numero_Usuario = "";
    this.user.Password_Usuario = "";
    this.mensaje = "";
  }

}
