import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Comentario } from '../models/comentarioModel';


@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  API_URI = 'http://localhost:3000/admin';
  API_URILog = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) { }

  listarComentario() {
    //para expandir/especializar las variables usamos ` y no ' o "
    //Las variables salen pintadas de otro color diferente del de texto
    return this.http.get(`${this.API_URI}/comentario`);
    //si no funciona usar 
    //return this.http.get(this.API_URI+'/list');
  }

  buscarComentario(id: string) {
    return this.http.get(`${this.API_URI}/find/${id}`);
  }

  guardarComentario(comentario: Comentario) {
    return this.http.post(`${this.API_URI}/create`, comentario);
  }

  eliminarComentario(id: string) {
    return this.http.delete(`${this.API_URI}/eliminarComentario/${id}`);
  }

  // actualizarUsuario(Numero_Usuario: string, usuario: Comentario): Observable<Comentario> {
  //   return this.http.put(`${this.API_URI}/modificarSocio/${Numero_Usuario}`, usuario);
  // }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['usuarios/ingresar']);
  }

  // getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
  //   return localStorage.getItem('token');
  // }
}
