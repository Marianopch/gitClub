import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    return this.http.get(`${this.API_URI}/calendar`, Id_Clase)
  }

}
