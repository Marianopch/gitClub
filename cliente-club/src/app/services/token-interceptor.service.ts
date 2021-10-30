import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { SociosService } from './socios.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private usuariosService: UsuariosService
    // private sociosService: SociosService
  ){}

  intercept(req:any,next:any){
    const tokenizeReq=req.clone({
      setHeaders:{
        Authotization: `Baerer ${this.usuariosService.getToken()}`,
      }
    })
    return next.handle(tokenizeReq);
  }

  // intercept2(req:any,next:any){
  //   const tokenizeReq=req.clone({
  //     setHeaders:{
  //       Authotization: `Baerer ${this.sociosService.getToken()}`,
  //     }
  //   })
  //   return next.handle(tokenizeReq);
  // }
}