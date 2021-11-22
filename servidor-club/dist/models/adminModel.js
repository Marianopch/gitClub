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
class AdminModel {
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
    //MENU SOCIOS
    listarTodosSocios() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            //const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
            const usuarios = yield this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Socio"');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    buscarUsuario(Numero_Usuario, DNI_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Descripcion_Rol,Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Numero_Usuario= ? OR DNI_Usuario = ?;', [Numero_Usuario, DNI_Usuario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    findUser(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM Usuarios WHERE Numero_Usuario= ? ;', [Numero_Usuario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO Usuarios SET ?', [usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //MENU ADMIN
    listarTodosAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            //const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
            const usuarios = yield this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Administrador"');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    buscarAdmin(Numero_Usuario, DNI_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Descripcion_Rol,Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Numero_Usuario= ? OR DNI_Usuario = ?;', [Numero_Usuario, DNI_Usuario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    crearAdmin(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO Usuarios SET ?', [usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro actualizar el usuario indicado por id
    actualizar(Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario, Password_Usuario, Id_Estado) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE Usuarios SET Nombre_Usuario = ? , Apellido_Usuario = ? , DNI_Usuario = ?, Mail_Usuario = ?, Telefono_Usuario = ? , Direccion_Usuario = ? , Password_Usuario = ?, Id_Estado = ? WHERE Numero_Usuario = ?', [Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario, Password_Usuario, Id_Estado, Numero_Usuario]))[0].affectedRows;
            // async actualizar(Numero_Usuario: string, Nombre_Usuario: string, Apellido_Usuario: string, DNI_Usuario: number, Mail_Usuario: string, Telefono_Usuario: number, Direccion_Usuario: string) {
            // 	console.log(Numero_Usuario);
            // 	const result = (await this.db.query('UPDATE Usuarios SET Nombre_Usuario = ?, Apellido_Usuario = ?, DNI_Usuario = ? ,Mail_Usuario = ?, Telefono_Usuario = ?, Direccion_Usuario = ? WHERE Numero_Usuario = ?', [Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario]))[0].affectedRows;
            console.log("BD:", result);
            return result;
        });
    }
    borrarClases(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM sociosclases WHERE Numero_Usuario = ?', [Numero_Usuario]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminar(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM Usuarios WHERE Numero_Usuario = ?', [Numero_Usuario]))[0].affectedRows;
            console.log("BD: ", user);
            return user;
        });
    }
    buscarId(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM Usuarios WHERE Numero_Usuario = ?', [Numero_Usuario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarClaseSocio(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            //const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
            const clasesSocio = yield this.db.query('SELECT SC.Id_Clase, SC.Numero_Usuario as "Socio" ,U.Nombre_Usuario, U.Apellido_Usuario, A.Descripcion_Actividad, H.Comienzo_Horario, H.Finalizacion_Horario, group_concat( D.Nombre_Dias) as Dias FROM sociosclases SC JOIN clases C ON SC.Id_Clase = C.Id_Clase JOIN actividades A ON A.Id_Actividad = C.Id_Actividad JOIN horarios H ON C.Id_Horario = H.Id_Horario JOIN diasclases DC ON DC.Id_Clase = C.Id_Clase JOIN dias D ON D.Id_dias = DC.Id_Dias JOIN usuarios U ON U.Numero_Usuario = C.Numero_Usuario WHERE SC.Numero_Usuario = ? GROUP BY sc.Id_Clase;;', [Numero_Usuario]);
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return clasesSocio[0];
        });
    }
    eliminarClaseSocio(Numero_Usuario, Id_Clase) {
        return __awaiter(this, void 0, void 0, function* () {
            const claseSocio = (yield this.db.query('DELETE FROM sociosclases WHERE Numero_Usuario = ? AND Id_Clase = ?', [Numero_Usuario, Id_Clase]))[0].affectedRows;
            console.log(claseSocio);
            return claseSocio;
        });
    }
    eliminarSociosdeClase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const eliminados = (yield this.db.query('DELETE FROM sociosClases WHERE Id_Clase = ?', [id]))[0].affectedRows;
            console.log(eliminados);
            return eliminados;
        });
    }
    //MENU ACTIVIDADES
    listarTodasActividades() {
        return __awaiter(this, void 0, void 0, function* () {
            const actividades = yield this.db.query('SELECT * FROM Actividades');
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return actividades[0];
        });
    }
    buscarActividad(Descripcion_Actividad) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM Actividades WHERE Descripcion_Actividad = ?', [Descripcion_Actividad]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    crearActividad(descripcion) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO Actividades ( Descripcion_Actividad ) VALUES  (?)', [descripcion]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    modificarActividad(Descripcion_Actividad, Id_Actividad) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE Actividades SET Descripcion_Actividad = ? WHERE Id_Actividad = ?', [Id_Actividad, Descripcion_Actividad]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminarActividad(Id_Actividad) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM Actividades WHERE Id_Actividad = ?', [Id_Actividad]))[0].affectedRows;
            console.log(user);
            return user;
        });
    }
    //MENU INSTRUCTORES
    listarTodosInstructores() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const usuarios = yield this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado, Id_Instructor FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Instructor"');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    buscarInstructor(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM Usuarios WHERE Numero_Usuario= ?', [Numero_Usuario]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    buscarClaseInstructores(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            //const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
            const clasesSocio = yield this.db.query('SELECT C.Id_Clase, A.Descripcion_Actividad, H.Comienzo_Horario, H.Finalizacion_Horario, group_concat( D.Nombre_Dias) as Dias, C.Cupo_Clase FROM clases C JOIN actividades A ON A.Id_Actividad = C.Id_Actividad JOIN horarios H ON C.Id_Horario = H.Id_Horario JOIN diasclases DC ON C.id_clase = DC.id_clase JOIN dias D ON DC.Id_dias = D.Id_dias WHERE C.Numero_Usuario = ? GROUP BY (Id_Clase);', [id]);
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return clasesSocio[0];
        });
    }
    buscarClasesdeIntr(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clasesSocio = yield this.db.query('SELECT COUNT(*) AS Cantidad FROM clases C WHERE C.Numero_Usuario = ?', [id]);
            if (clasesSocio[0][0].Cantidad === 0) {
                return 0;
            }
            else {
                return 1;
            }
        });
    }
    buscarClaseInstructor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('SELECT COUNT(*) AS Cantidad FROM clases WHERE Numero_Usuario = ?', [id]);
            if (clases[0][0].Cantidad === 0) {
                return 0;
            }
            else {
                return 1;
            }
        });
    }
    borrarClasesInstructor(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    //MENU CLASE
    listarHorarios() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const horarios = yield this.db.query('SELECT * FROM horarios');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return horarios[0];
        });
    }
    listarTodosInstructoresActivos() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const usuarios = yield this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Apellido_Usuario FROM Usuarios WHERE Id_Rol = 3 AND Id_Estado = 1');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return usuarios[0];
        });
    }
    buscarHora(Id_Horario) {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const horarios = yield this.db.query('SELECT * FROM horarios WHERE Id_Horario = ?', [Id_Horario]);
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            if (horarios.length > 1)
                return horarios[0][0];
            return null;
        });
    }
    crearClase(Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO clases  (Id_Actividad, Id_Horario , Cupo_Clase, Numero_Usuario)   Values  (?, ?, ? ,? )', [Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    crearClaseDias(Id_Clase, dia) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(Id_Clase);
            const resultDias = (yield this.db.query('INSERT INTO diasclases  (Id_Clase, Id_Dias)   Values  (?, ?)', [Id_Clase, dia]))[0].affectedRows;
            console.log(resultDias);
            return resultDias;
        });
    }
    eliminarClase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clasedia = (yield this.db.query('DELETE FROM diasclases WHERE Id_Clase = ?', [id]))[0].affectedRows;
            console.log(clasedia);
            const clase = (yield this.db.query('DELETE FROM clases WHERE Id_Clase = ?', [id]))[0].affectedRows;
            console.log(clase);
            return clase;
        });
    }
    buscarInscriptosClase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = yield this.db.query('SELECT COUNT(*) AS Cantidad FROM sociosClases WHERE Id_Clase = ?', [id]);
            console.log("BD Busqueda", busqueda[0][0].Cantidad);
            if (busqueda[0][0].Cantidad === 0) {
                return 0;
            }
            else {
                return 1;
            }
            //return busqueda[0][0].Cantidad;
            //return null;
        });
    }
    listarClases() {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('Select C.Id_Clase, A.Descripcion_Actividad, H.Comienzo_Horario, H.Finalizacion_Horario, group_concat( D.Nombre_Dias) as Dias, U.Nombre_Usuario, U.Apellido_Usuario, C.Cupo_Clase from clases C JOIN Actividades A ON A.Id_Actividad = C.Id_Actividad JOIN Horarios H ON C.Id_Horario = H.Id_Horario JOIN Usuarios U ON U.Numero_Usuario = C.Numero_Usuario JOIN diasclases DC ON C.id_clase = DC.id_clase JOIN dias D ON DC.Id_dias = D.Id_dias GROUP BY (Id_Clase)');
            return clases[0];
        });
    }
    buscarClase(Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('SELECT * FROM clases WHERE Id_Actividad = ? AND Id_Horario = ? AND Cupo_Clase = ? AND Numero_Usuario = ?', [Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario]);
            if (clases.length > 1)
                return clases[0][0];
            return null;
        });
    }
    listarDias() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const dias = yield this.db.query('SELECT * FROM dias');
            return dias[0];
        });
    }
    buscarClaseActividad(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clases = yield this.db.query('SELECT * FROM clases WHERE Id_Actividad = ?', [id]);
            if (clases.length > 1)
                return clases[0][0];
            return null;
        });
    }
    consultaIDClase(Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const Id_Clase = yield this.db.query('SELECT Id_Clase, Id_Actividad FROM clases WHERE Id_Actividad = ? AND Id_Horario = ? AND Cupo_Clase = ? AND Numero_Usuario = ?', [Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return Id_Clase[0];
        });
    }
    //Comentario
    listarComentario() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const comentario = yield this.db.query('SELECT Id_Comentario, Titulo_Comentario, Descripcion_Comentario, Numero_Usuario, DATE_FORMAT(fcreacion, "%d/%m/%Y %H:%i") AS fcreacion FROM comentario order by fcreacion desc;');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return comentario[0];
        });
    }
    crearComentario(comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO comentario SET ?', [comentario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminarComentario(Id_Comentario) {
        return __awaiter(this, void 0, void 0, function* () {
            const comentario = (yield this.db.query('DELETE FROM comentario WHERE Id_Comentario = ?', [Id_Comentario]))[0].affectedRows;
            console.log(comentario);
            return comentario;
        });
    }
    buscarEstados() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const estados = yield this.db.query('SELECT * FROM Estados;');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return estados[0];
        });
    }
}
//Exportamos el enrutador con 
const adminModel = new AdminModel();
exports.default = adminModel;
//# sourceMappingURL=adminModel.js.map