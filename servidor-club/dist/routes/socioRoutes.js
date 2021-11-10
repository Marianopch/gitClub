"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socioController_1 = __importDefault(require("../controller/socioController"));
class SocioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        //SocioPage - Calendar Sector - Inscripcion
        this.router.get('/clasesTotales', socioController_1.default.clasesTotales);
        this.router.get('/llenarCalendar/:Descripcion_Actividad', socioController_1.default.llenarCalendar);
        this.router.get('/calendar/:Id_Clase', socioController_1.default.verInfoClase);
        this.router.post('/calendar/inscripcion', socioController_1.default.inscripcionSocioClase);
        //SocioPage - MiPerfil Sector 
        this.router.get('/miperfil/:Numero_Usuario', socioController_1.default.miperfil);
        //SocioPage - MisActividades Sector 
        this.router.get('/buscarActividades/:Numero_Usuario', socioController_1.default.misActividades);
        this.router.delete('/misActividades/:id/:Numero_Usuario', socioController_1.default.eliminarClase);
        //Comentarios
        this.router.get('/list', socioController_1.default.listComent);
        this.router.get('/lastComents', socioController_1.default.listarUltimosComentarios);
    }
}
//Exportamos el enrutador con 
const socioRoutes = new SocioRoutes();
exports.default = socioRoutes.router;
//# sourceMappingURL=socioRoutes.js.map