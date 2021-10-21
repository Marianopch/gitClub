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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class SocioModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'club',
                connectionLimit: 10
            });
        });
    }
    listarClaseLu() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario,  Finalizacion_Horario, diasclases.Id_Dias FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad ');
            return usuarios[0];
        });
    }
    listarClaseMa() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "2" ');
            return usuarios[0];
        });
    }
    listarClaseMi() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "3" ');
            return usuarios[0];
        });
    }
    listarClaseJu() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "4" ');
            return usuarios[0];
        });
    }
    listarClaseVi() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "5" ');
            return usuarios[0];
        });
    }
    listarClaseSa() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "6" ');
            return usuarios[0];
        });
    }
    listarClaseDo() {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "7" ');
            return usuarios[0];
        });
    }
    verClase(Id_Clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE clases.Id_Clase = ?;', [Id_Clase]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //SocioPage - MiPerfil Sector 
    verDatosUser(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM usuarios WHERE Numero_Usuario = ?;', [Numero_Usuario]);
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    inscribirSocio(Id_Clase, Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Id_Clase, Numero_Usuario);
            const result = (yield this.db.query('INSERT INTO sociosclases ( Id_Clase, Numero_Usuario ) VALUES  (?, ?)', [Id_Clase, Numero_Usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
}
//Exportamos el enrutador con 
const socioModel = new SocioModel();
exports.default = socioModel;
//# sourceMappingURL=socioModel.js.map