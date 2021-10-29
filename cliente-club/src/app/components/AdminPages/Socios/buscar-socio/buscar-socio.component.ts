import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-socio',
  templateUrl: './buscar-socio.component.html',
  styleUrls: ['./buscar-socio.component.css']
})

export class BuscarSocioComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  filterPost ='';
  page:number =0;

  errorNumUs=0;
  errorNombre=0;
  errorApellido=0;
  errorDNI=0;
  errorMail=0;
  errorTel=0;
  errorDirec=0;
  errorPassword=0;
  @ViewChild('closeAddExpenseModal')
  closeAddExpenseModal!: ElementRef;

  reintentar: boolean = false;
  mensaje: string = "";
  usuarios: any = [];
  user = { Numero_Usuario: "", Nombre_Usuario: "", Apellido_Usuario: "", DNI_Usuario: "", Mail_Usuario: "", Telefono_Usuario: "", Direccion_Usuario: "", Password_Usuario: "", Id_Rol: "2", Id_Estado: "1" };
  usuariosfilter: any = [];
  userfilter = { Numero_Usuario: "", Nombre_Usuario: "", Apellido_Usuario: "", DNI_Usuario: "", Mail_Usuario: "", Telefono_Usuario: "", Direccion_Usuario: "", Password_Usuario: "", Id_Rol: "2", Id_Estado: "1" };

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(
      res => {
        this.usuarios = res;
        console.log(res)
      },
      err => console.log(err)
    )
  }
  
//FILTRO PIPE
  nextPage(){
    this.page +=10;
  }
  prevPage(){
    if(this.page >0) 
    this.page -=10;
  }
//-------------------------


  buscarArray(Numero: any): void {

    // for(let elemento of this.usuarios){
    //   // if(Numero == elemento.Numero_Usuario){
    //   // this.usuariosfilter.push(this.usuarios[elemento]);
    //   //   console.log(this.usuarios[elemento]);
    //   console.log("Index:", elemento.Numero_Usuario.indexOf(Numero)) ;
    //   // }
    // }

    // console.log("Index:", this.usuarios.Numero_Usuario.indexOf(Numero)) ;
    this.usuariosfilter = this.usuarios.find((u: { Numero_Usuario: any; }) => u.Numero_Usuario === Numero );
    

  }

  eliminarUser(Numero_Usuario: any) {

    console.log(this.usuarios)
    this.usuariosService.eliminarUsuario(Numero_Usuario).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['admin/home']);
      },
      error => {
        console.log(error);
        this.router.navigate(['admin/agregarSocio']);
      });
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

  // METODOS CREAR

  registrar(){
		
    console.log(this.user)
    
    this.usuariosService.registrar(this.user).subscribe(
      res => {
        let result:any=res;
        console.log(result.message);
        this.router.navigate(['admin/buscarSocio']);
        this.resetModal();
        this.ngOnInit();
        
      },
      err => {
        console.log(err.error.message);
        this.reintentar = true;
        this.mensaje = err.error.message;
      }

      
    )
	}

  verificarForm():boolean{
    this.errorNumUs=this.verificarNumUs(this.user.Numero_Usuario);
    this.errorNombre=this.verificarNombre(this.user.Nombre_Usuario);
    this.errorApellido=this.verificarApellido(this.user.Apellido_Usuario);
    this.errorPassword=this.verificarPassword (this.user.Password_Usuario);
    this.errorDNI=this.verificarDNI(this.user.DNI_Usuario);
    
   //this.errorRePassrword=verificarRePassword(this.user.password, this.user.repassword);
    this.errorMail=this.verificarMail(this.user.Mail_Usuario);
    this.errorTel=this.verificarTelefono(this.user.Telefono_Usuario);
    this.errorDirec=this.verificarDireccion(this.user.Direccion_Usuario);
    if(  (this.errorNombre+this.errorPassword+this.errorNumUs+this.errorMail+this.errorDNI+this.errorTel+this.errorDirec)>0){
      return false;
    }
    return true;
  }

  verificarModificarForm():boolean{
  
    this.errorNombre=this.verificarNombre(this.usuariosfilter.Nombre_Usuario);
    this.errorApellido=this.verificarApellido(this.usuariosfilter.Apellido_Usuario);
    this.errorPassword=this.verificarPassword (this.usuariosfilter.Password_Usuario);
    this.errorDNI=this.verificarDNI(this.usuariosfilter.DNI_Usuario);
    
   //this.errorRePassrword=verificarRePassword(this.user.password, this.user.repassword);
    this.errorMail=this.verificarMail(this.usuariosfilter.Mail_Usuario);
    this.errorTel=this.verificarTelefono(this.usuariosfilter.Telefono_Usuario);
    this.errorDirec=this.verificarDireccion(this.usuariosfilter.Direccion_Usuario);
    if(  (this.errorNombre+this.errorPassword+this.errorNumUs+this.errorMail+this.errorDNI+this.errorTel+this.errorDirec)>0){
      return false;
    }
    return true;
  }

  verificarNumUs(Numero_Usuario:string): number {
    const patron=/^[s][0-9]{1,5}$/i;
    if(Numero_Usuario.length==0)
      return 1;
    if(Numero_Usuario.length>6)
      return 2;
    if(!patron.test(Numero_Usuario))
      return 3;
    return 0;
  }

   verificarNombre(nombre:string):number {
    const patron=/[A-Za-z]/;         
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    return 0;
  }

  verificarApellido(Apellido_Usuario:string):number {
    const patron=/[A-Za-z]/;        
    if(Apellido_Usuario.length==0)
      return 1;
    if(Apellido_Usuario.length>20)
      return 2;
    if(!patron.test(Apellido_Usuario))
      return 3;
    return 0;
  }

  verificarDNI(DNI_Usuario:any):number {
    const patron=/^[0-9]{7,8}$/;         //NO FUNCIONA EL FILTRO ALFABETICO
    if(DNI_Usuario.length==0)
      return 1;
    if (  DNI_Usuario.length>8 )
      return 2;

    if (DNI_Usuario<1000000)
      return 3;
      
     if(!patron.test(DNI_Usuario))
       return 4;
    return 0;
  }


  
   verificarPassword(password:any): number {
    const patron=/[A-Za-z0-9]/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(!patron.test(password))
      return 3;
    return 0;
  }
  
   /*verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  } */
  
   verificarMail(mail:any): number {
    const patron=/[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}/;
    if(mail.length==0)
      return 1;
    if(mail.length>20)
      return 2;
    if(!patron.test(mail))
      return 3;
    return 0;
  }

  verificarTelefono(telefono: string) {
    const patron = /^[0-9]{1,}$/;
    
    if (telefono.length == 0)
      return 1;
      if (!patron.test(telefono))
      return 4;
    if (telefono.length > 10)
      return 2;
    if (telefono.length < 8)
      return 3;
   
    return 0;
  }

  verificarDireccion(Direccion_Usuario:any): number {
    const patron=/[a-z]{1,20} [0-9]{1,10}/;
    if(Direccion_Usuario.length==0)
      return 1;
    if(Direccion_Usuario.length>30)
      return 2;
    if(!patron.test(Direccion_Usuario))
      return 3;
    return 0;
  }
  
  recargarForm() {
    this.reintentar = false;
    this.mensaje = "";
  }

  resetModal() {
    this.user.Numero_Usuario = '';
    this.user.Nombre_Usuario = '';
    this.user.Apellido_Usuario = '';
    this.user.DNI_Usuario = '';
    this.user.Telefono_Usuario = '';
    this.user.Direccion_Usuario = '';
    this.user.Mail_Usuario = '';
    this.user.Password_Usuario = '';
}

}
