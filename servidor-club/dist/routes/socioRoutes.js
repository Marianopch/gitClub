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
        this.router.get('/clasesLu', socioController_1.default.clasesLu);
        this.router.get('/clasesMa', socioController_1.default.clasesMa);
        this.router.get('/clasesMi', socioController_1.default.clasesMi);
        this.router.get('/clasesJu', socioController_1.default.clasesJu);
        this.router.get('/clasesVi', socioController_1.default.clasesVi);
        this.router.get('/clasesSa', socioController_1.default.clasesSa);
        this.router.get('/clasesDo', socioController_1.default.clasesDo);
        this.router.get('/calendar', socioController_1.default.verInfoClase);
        //SocioPage - MiPerfil Sector 
        this.router.get('/miperfil/:Numero_Usuario', socioController_1.default.miperfil);
    }
}
//Exportamos el enrutador con 
const socioRoutes = new SocioRoutes();
exports.default = socioRoutes.router;
//# sourceMappingURL=socioRoutes.js.map