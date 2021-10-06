import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Actividad } from '../models/actividadModel';
import { Clase } from '../models/claseModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Dias } from '../models/diaModel';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  API_URI = 'http://localhost:3000/admin';
  API_URILog = 'http://localhost:3000/user';

  admin_ = new EventEmitter<string>();
  user$= new EventEmitter<string>();
  loged$ = new EventEmitter<string>();

  constructor(private http: HttpClient, private router: Router) { }

  listarUsuarios() {
    return this.http.get(`${this.API_URI}/buscarSocio`);
  }

  buscarUsuario(id: string) {
    return this.http.get(`${this.API_URI}/find/${id}`);
  }

  guardarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URI}/create`, usuario);
  }

  eliminarUsuario(Numero_Usuario: string) {
    return this.http.delete(`${this.API_URI}/eliminarSocio/${Numero_Usuario}`);
  }

  actualizarUsuario(Numero_Usuario: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put(`${this.API_URI}/modificarSocio/${Numero_Usuario}`, usuario);
  }

  ingresar(usuario: any) {
    return this.http.post(`${this.API_URILog}/signin`, usuario);
  }

  registrar(usuario: any) {
    return this.http.post(`${this.API_URI}/signup`, usuario);
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.router.navigate(['/']);
  }

  //AdminPage - Admin Sector
  
  listarAdmin() {
    return this.http.get(`${this.API_URI}/buscarAdmin`);
  }

  eliminarAdmin(Numero_Usuario: string) {
    return this.http.delete(`${this.API_URI}/eliminarAdmin/${Numero_Usuario}`);
  }

  actualizarAdmin(Numero_Usuario: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put(`${this.API_URI}/modificarAdmin/${Numero_Usuario}`, usuario);
  }

  //AdminPage - Actividades Sector
  guardarActividad(actividad: Actividad) {
    return this.http.post(`${this.API_URI}/agregarActividad`, actividad);
  }

  listarActividad() {
    return this.http.get(`${this.API_URI}/buscarActividad`);
  }

  eliminarActividad(id: string) {
    return this.http.delete(`${this.API_URI}/eliminarActividad/${id}`);
  }

  actualizarActividad(id: string, actividad: Actividad): Observable<Actividad> {
    return this.http.put(`${this.API_URI}/modificarActividad/${id}`, actividad);
  }

  //AdminPage - Instructor Sector
  listarInstructor() {
    return this.http.get(`${this.API_URI}/buscarInstructor`);
  }

  eliminarInstructor(id: string) {
    return this.http.delete(`${this.API_URI}/eliminarInstructor/${id}`);
  }

  //falta arreglar
  actualilzarInstructor(id: string, actividad: Actividad): Observable<Actividad> {
    return this.http.put(`${this.API_URI}/modificarInstructor/${id}`, actividad);
  }

  //AdminPage - Clases Sector
  listarHorarios(){
    return this.http.get(`${this.API_URI}/buscarhorarios`);
  }

  agregarClase(clase: Clase) {
    return this.http.post(`${this.API_URI}/agregarClase`, clase);
  }

  listarClase(){
    return this.http.get(`${this.API_URI}/buscarClase`);
  }

  listarDias(){
    return this.http.get(`${this.API_URI}/buscardias`);
  }

  getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
    return localStorage.getItem('token');
  }
}

