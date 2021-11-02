import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';
import {Router} from '@angular/router';
import { SociosService } from './services/socios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  	constructor(
		private authService: UsuariosService,
		private router:Router
		// ,private authService2: SociosService
	){}

  	canActivate(){
		if(this.authService.isLoggedIn()){
			return true;
		}
		this.router.navigate(['usuarios/ingresar']);
		return false;
	}

	// canActivate2(){
	// 	if(this.authService2.isLoggedIn()){
	// 		return true;
	// 	}
	// 	this.router.navigate(['usuarios/ingresar']);
	// 	return false;
	// }

  
}
