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
            const envioDatos = req.body;
            const busqueda = yield socioModel_1.default.consultaClases(envioDatos[0], envioDatos[1]);
            if (!busqueda) {
                const cupo = yield socioModel_1.default.consultarCupo(envioDatos[0]);
                const cantidadInscriptos = yield socioModel_1.default.cantidadInscriptos(envioDatos[0]);
                if (cantidadInscriptos[0].Cantidad < cupo[0].CUPO_CLASE) {
                    //traigo horario y dia de la clase a anotarse
                    const horarioClaseAnotar = yield socioModel_1.default.consultaHorario(envioDatos[0]);
                    //traigo horario y dia de la clases inscriptas
                    const horarioClasesInscriptas = yield socioModel_1.default.consultaHorario2(envioDatos[1], envioDatos[2]);
                    //hago un array con los dias 
                    const arrayDias1 = horarioClaseAnotar.Dias.split(',');
                    //hago un array con los dias 
                    if (horarioClasesInscriptas == null || horarioClasesInscriptas == undefined) {
                        const inscripcion = yield socioModel_1.default.inscribirSocio(envioDatos[0], envioDatos[1]);
                        return res.json({ message: "El usuario fue inscripto a la clase." });
                    }
                    else {
                        const arrayDias2 = horarioClasesInscriptas.Dias.split(',');
                        let resultado = findCommonElement(arrayDias1, arrayDias2);
                        if (resultado == true) {
                            return res.status(403).json({ message: 'No puedes inscribirte a las clases, hay una clase con este horario en la cual esta inscripto.' });
                        }
                        else {
                            const inscripcion = yield socioModel_1.default.inscribirSocio(envioDatos[0], envioDatos[1]);
                            return res.json({ message: "El usuario fue inscripto a la clase." });
                        }
                    }
                }
                else {
                    return res.status(403).json({ message: "No hay cupo para esta clase." });
                }
            }
            else {
                return res.status(403).json({ message: "El usuario ya esta inscripto en esta clase." });
            }
            function findCommonElement(array1, array2) {
                for (let i = 0; i < array1.length; i++) {
                    for (let j = 0; j < array2.length; j++) {
                        if (array1[i] === array2[j]) {
                            return true;
                        }
                    }
                }
                return false;
            }
        });
    }
    misActividades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { Numero_Usuario } = req.params;
            const misAct = yield socioModel_1.default.buscarmisAct(Numero_Usuario);
            return res.json(misAct);
        });
    }
    eliminarClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            const { id } = req.params;
            const { Numero_Usuario } = req.params;
            console.log("Id", id, "Numero", Numero_Usuario);
            const eliminar = yield socioModel_1.default.eliminarClase(id, Numero_Usuario);
            return res.status(200).json({ message: 'Clase ELIMINADA!' });
        });
    }
    listComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.header("Authorization"));
            console.log(req.body);
            const comentario = yield socioModel_1.default.listarComentario();
            return res.json(comentario);
        });
    }
    listarUltimosComentarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.header("Authorization"));
            const comentario = yield socioModel_1.default.listarUltimoComentario();
            return res.json(comentario);
        });
    }
    endSession(req, res) {
        req.session.user = {};
        req.session.auth = false;
        req.session.admin = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
}
const socioController = new SocioController();
exports.default = socioController;
//# sourceMappingURL=socioController.js.map