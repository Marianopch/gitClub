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
    listarclasesTotales() {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('SELECT * FROM actividades A WHERE EXISTS (SELECT * FROM clases C WHERE C.Id_Actividad = A.Id_Actividad)');
            return clases[0];
        });
    }
    llenarCalendario(Descripcion_Actividad) {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad  WHERE actividades.Descripcion_Actividad = ?;', [Descripcion_Actividad]);
            return clases[0];
        });
    }
    verClase(Id_Clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad JOIN usuarios ON usuarios.Numero_Usuario = clases.Numero_Usuario WHERE clases.Id_Clase = ?;', [Id_Clase]);
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
            const result = (yield this.db.query('INSERT INTO sociosclases ( Id_Clase, Numero_Usuario ) VALUES  (?, ?)', [Id_Clase, Numero_Usuario]))[0].affectedRows;
            console.log("BD:", result);
            return result;
        });
    }
    consultarCupo(clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const cupo = yield this.db.query('SELECT CUPO_CLASE FROM CLASES WHERE ID_CLASE = ?', [clase]);
            return cupo[0];
        });
    }
    cantidadInscriptos(clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.db.query('SELECT COUNT(*) as "Cantidad" FROM sociosclases WHERE Id_Clase = ?', [clase]);
            return count[0];
        });
    }
    buscarmisAct(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT SC.Id_Clase, A.Descripcion_Actividad, H.Comienzo_Horario, H.Finalizacion_Horario, group_concat( D.Nombre_Dias) as Dias FROM Usuarios U JOIN sociosclases SC ON U.Numero_Usuario = SC.Numero_Usuario JOIN clases C ON SC.Id_Clase = C.Id_Clase JOIN diasclases DC ON C.id_clase = DC.id_clase JOIN dias D ON DC.Id_dias = D.Id_dias JOIN horarios H ON C.Id_Horario = H.Id_Horario JOIN actividades A ON A.Id_Actividad = C.Id_Actividad WHERE U.Numero_Usuario = ? GROUP BY SC.Id_Clase;', [Numero_Usuario]);
            if (encontrado.length > 1)
                return encontrado[0];
            return null;
        });
    }
    eliminarClase(id, Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const clasedia = (yield this.db.query('DELETE FROM sociosClases WHERE Id_Clase = ? AND Numero_Usuario = ?', [id, Numero_Usuario]))[0].affectedRows;
            return clasedia;
        });
    }
    listarComentario() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const comentario = yield this.db.query('SELECT Id_Comentario, Titulo_Comentario, Descripcion_Comentario, Numero_Usuario, DATE_FORMAT(fcreacion, "%d/%m/%Y %H:%i") AS fcreacion FROM comentario order by fcreacion desc;');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return comentario[0];
        });
    }
    listarUltimoComentario() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const comentario = yield this.db.query('SELECT Id_Comentario, Titulo_Comentario, Descripcion_Comentario, Numero_Usuario, DATE_FORMAT(fcreacion, "%d/%m/%Y %H:%i") AS fcreacion FROM comentario order by fcreacion desc LIMIT 3');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return comentario[0];
        });
    }
    consultaClases(clase, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = yield this.db.query('SELECT * FROM sociosclases WHERE Id_Clase = ? AND Numero_Usuario = ?', [clase, user]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (consulta.length > 1) {
                return consulta[0][0];
            }
            return null;
        });
    }
    consultaHorario(idClase) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = yield this.db.query('SELECT C.ID_CLASE, group_concat( DC.Id_dias) AS "Dias", H.COMIENZO_HORARIO FROM CLASES C JOIN Horarios H ON C.Id_Horario = H.Id_Horario JOIN diasclases DC ON C.id_clase = DC.id_clase  WHERE C.Id_Clase = ? GROUP BY (C.Id_Clase);', [idClase]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (consulta.length > 1) {
                return consulta[0][0];
            }
            return null;
        });
    }
    consultaHorario2(idsocio, horario) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = yield this.db.query('SELECT SC.ID_CLASE, group_concat( Dc.Id_dias) AS "Dias", H.COMIENZO_HORARIO FROM SOCIOSCLASES SC JOIN CLASES C ON C.Id_Clase = SC.Id_Clase JOIN diasclases DC ON C.id_clase = DC.id_clase JOIN Horarios H ON C.Id_Horario = H.Id_Horario WHERE SC.NUMERO_USUARIO = ? AND H.COMIENZO_HORARIO = ? GROUP BY (C.Id_Clase);', [idsocio, horario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (consulta.length > 1) {
                return consulta[0][0];
            }
            return null;
        });
    }
}
//Exportamos el enrutador con 
const socioModel = new SocioModel();
exports.default = socioModel;
//# sourceMappingURL=socioModel.js.map