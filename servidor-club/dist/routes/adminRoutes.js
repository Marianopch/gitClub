"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controller/adminController"));
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        this.router.get('/home', adminController_1.default.home);
        this.router.post('/home', adminController_1.default.home);
        //Menu Socios.
        //Buscar
        this.router.get('/buscarSocio', adminController_1.default.listarSocios);
        //Agregar
        this.router.post('/signup', adminController_1.default.agregarUsuario);
        this.router.get('/signup', adminController_1.default.mostrarFormAgregar);
        //Eliminar
        this.router.delete('/eliminarSocio/:Numero_Usuario', adminController_1.default.eliminar);
        //Modificar
        this.router.put('/modificarSocio/:Numero_Usuario', adminController_1.default.modificarSocio);
        //Menu Activades.
        //Buscar
        this.router.get('/buscarActividad', adminController_1.default.listarActividad);
        //Agregar
        this.router.post('/agregarActividad', adminController_1.default.agregarActividad);
        this.router.get('/agregarActividad', adminController_1.default.mostrarFormActividad);
        //Eliminar
        this.router.delete('/eliminarActividad/:Id_Actividad', adminController_1.default.eliminarActividad);
        //Modificar
        this.router.put('/modificarActividad/:Id_Actividad', adminController_1.default.modificarActividad);
        //Menu Instructores
        //Buscar
        this.router.get('/buscarInstructor', adminController_1.default.listarInstructores);
        //Agregar
        this.router.post('/agregarInstructor', adminController_1.default.agregarUsuario);
        //this.router.get('/agregarInstructor', adminController.mostrarFormInstructores);
        //Eliminar
        this.router.get('/eliminarInstructor/:Numero_Usuario', adminController_1.default.eliminar);
        //Modificar
        this.router.post('/modificarInstructor/:Numero_Usuario', adminController_1.default.modificarSocio);
        //Menu Admin
        //Buscar
        this.router.get('/buscarAdmin', adminController_1.default.listarAdmin);
        //Agregar
        this.router.post('/agregarAdmin', adminController_1.default.agregarUsuario);
        this.router.get('/agregarAdmin', adminController_1.default.mostrarFormAgregarAdmin);
        //Eliminar
        this.router.delete('/eliminarAdmin/:Numero_Usuario', adminController_1.default.eliminar);
        //Modificar
        this.router.put('/modificarAdmin/:Numero_Usuario', adminController_1.default.modificarSocio);
        //Menu Clase
        this.router.get('/buscarhorarios', adminController_1.default.listarHorarios);
        this.router.post('/agregarClase', adminController_1.default.agregarClase);
        this.router.get('/buscarClase', adminController_1.default.buscarClase);
        this.router.get('/buscardias', adminController_1.default.listarDias);
        //Socio-Actividad
        this.router.post('/notarActividad', adminController_1.default.anotarActividad);
        this.router.get('/error', adminController_1.default.showError);
        //this.router.get('/buscarSocio',adminController.buscarSocio);
        //Comentarios
        this.router.get('/list', adminController_1.default.listComent);
        this.router.post('/create', adminController_1.default.createComent);
        this.router.delete('/delete/:Id_Comentario', adminController_1.default.deleteComent);
    }
}
//Exportamos el enrutador con 
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
//# sourceMappingURL=adminRoutes.js.map