"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socioModel_1 = __importDefault(require("../models/socioModel"));
class SocioController {
    //SocioPage - Calendar Sector - Inscripcion
    clasesTotales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            console.log(req.body);
            const clases = yield socioModel_1.default.listarclasesTotales();
            return res.json(clases);
        });
    }
    llenarCalendar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { Descripcion_Actividad } = req.params;
            const clases = yield socioModel_1.default.llenarCalendario(Descripcion_Actividad);
            return res.json(clases);
        });
    }
    //SocioPage - MiPerfil Sector 
    miperfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { Numero_Usuario } = req.params;
            const datosusuario = yield socioModel_1.default.verDatosUser(Numero_Usuario);
            return res.json(datosusuario);
        });
    }
    verInfoClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { Id_Clase } = req.params;
            const datosclase = yield socioModel_1.default.verClase(Id_Clase);
            return res.json(datosclase);
        });
    }
    inscripcionSocioClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const envioDatos = req.body;
            console.log(envioDatos);
            console.log(envioDatos[0]);
            console.log(envioDatos[1]);
            // console.log(envioDatos.Id_Clase);
            // console.log(envioDatos.Usuario);
            const inscripcion = yield socioModel_1.default.inscribirSocio(envioDatos[0], envioDatos[1]);
            return res.json(inscripcion);
        });
    }
    misActividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { Numero_Usuario } = req.params;
            console.log(Numero_Usuario);
            const misAct = yield socioModel_1.default.buscarmisAct(Numero_Usuario);
            return res.json(misAct);
        });
    }
    listComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.header("Authorization"));
            console.log(req.body);
            const comentario = yield socioModel_1.default.listarComentario();
            console.log(comentario);
            return res.json(comentario);
        });
    }
}
const socioController = new SocioController();
exports.default = socioController;
//# sourceMappingURL=socioController.js.map