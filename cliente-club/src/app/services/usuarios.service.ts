import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Actividad } from '../models/actividadModel';
import { Clase } from '../models/claseModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Dias } from '../models/diaModel';
import { Comentario } from '../models/comentarioModel';
import { StorageModel } from '../models/storageModel';

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

  buscarUsuario(Numero_Usuario: string) {
    return this.http.get(`${this.API_URI}/find/${Numero_Usuario}`);
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

  buscarClase(Numero_Usuario: string){
    return this.http.get(`${this.API_URI}/buscarClaseSocio/${Numero_Usuario}`);
  }

  eliminarClasseUser(Numero_Usuario: string, Id_Clase: number){
    return this.http.delete(`${this.API_URI}/eliminarClaseUser/${Numero_Usuario}/${Id_Clase}`);
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
  actualilzarInstructor(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put(`${this.API_URI}/modificarInstructor/${id}`, usuario);
  }

  //AdminPage - Clases Sector
  listarHorarios(){
    return this.http.get(`${this.API_URI}/buscarhorarios`);
  }

  agregarClase(clase: any) {
    console.log(clase);
    return this.http.post(`${this.API_URI}/agregarClase`, clase);
  }

  listarClase(){
    return this.http.get(`${this.API_URI}/buscarClase`);
  }

  listarDias(){
    return this.http.get(`${this.API_URI}/buscardias`);
  }

  // COmentarios
  listarComentarios() {
    return this.http.get(`${this.API_URI}/list`);

  }

  cargaEstados(){
    return this.http.get(`${this.API_URI}/buscarEstados`);
  }


  // filtrarUser(searchText: string) {
  //   console.log(searchText);
  //   return this.http.get(`${this.API_URI}/find/${searchText}`);
  // }

  guardarComentarios(comentario: Comentario) {
    console.log(comentario);
    return this.http.post(`${this.API_URI}/create`, comentario);
  }

  eliminarComentarios(comentario: any) {
    return this.http.delete(`${this.API_URI}/delete/${comentario.Id_Comentario}`);
  }

  getToken() {//Obtenemos el token que despues enviara el interceptor x cada req
    let trae = localStorage.getItem('token');
    console.log("GetTokenservice", trae)
    return localStorage.getItem('token');
  }

  isLoggedIn(): Boolean {
    return !!localStorage.getItem('token'); //Si existe token retorna true
    //es el equivalente de testearlo con if pero ahora en una sola linea.
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('Usuario');
    this.router.navigate(['/']);
  }
}

