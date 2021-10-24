import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { claseSocio } from '../models/claseSocioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  API_URI = 'http://localhost:3000/socio';

  constructor(private http: HttpClient, private router: Router) { }

  //SocioPage - Calendar Sector - Inscripcion

  clasesLu(){
    return this.http.get(`${this.API_URI}/clasesLu`);
  }
  clasesMa(){
    return this.http.get(`${this.API_URI}/clasesMa`);
  }
  clasesMi(){
    return this.http.get(`${this.API_URI}/clasesMi`);
  }
  clasesJu(){
    return this.http.get(`${this.API_URI}/clasesJu`);
  }
  clasesVi(){
    return this.http.get(`${this.API_URI}/clasesVi`);
  }
  clasesSa(){
    return this.http.get(`${this.API_URI}/clasesSa`);
  }
  clasesDo(){
    return this.http.get(`${this.API_URI}/clasesDo`);
  }


  buscarDatosSocio(Numero_Usuario: any){
    return this.http.get(`${this.API_URI}/miperfil/${Numero_Usuario}`)
  }
  
  buscarClase(Id_Clase: any){
    return this.http.get(`${this.API_URI}/calendar/${Id_Clase}`)
  }

  // inscribirSocio(claseSocio: claseSocio ): Observable<claseSocio>{
  //   console.log(claseSocio);
    
  //   return this.http.post(`${this.API_URI}/calendar/inscripcion`, claseSocio)
  // }

  // inscribirSocio(claseSocio: claseSocio ){
  //   console.log(claseSocio.Id_Clase);
  //   return this.http.post(`${this.API_URI}/calendar/inscripcion`, claseSocio)
  // }

  inscribirSocio(envioDatos: claseSocio ){
    console.log(envioDatos);
    return this.http.post(`${this.API_URI}/calendar/inscripcion`, envioDatos)
  }

  //LISTAR ACTIVIDADES DEL SOCIO

  ListarSocioActividades() {
    return this.http.get(`${this.API_URI}/buscarActividad`);
  }

}
