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
    actualizar(Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Direccion_Usuario, Mail_Usuario, Telefono_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE Usuarios SET Nombre_Usuario = ? , Apellido_Usuario = ? , DNI_Usuario = ?, Mail_Usuario = ?, Telefono_Usuario = ? , Direccion_Usuario = ?  WHERE Numero_Usuario = ?', [Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario, Numero_Usuario]))[0].affectedRows;
            // async actualizar(Numero_Usuario: string, Nombre_Usuario: string, Apellido_Usuario: string, DNI_Usuario: number, Mail_Usuario: string, Telefono_Usuario: number, Direccion_Usuario: string) {
            // 	console.log(Numero_Usuario);
            // 	const result = (await this.db.query('UPDATE Usuarios SET Nombre_Usuario = ?, Apellido_Usuario = ?, DNI_Usuario = ? ,Mail_Usuario = ?, Telefono_Usuario = ?, Direccion_Usuario = ? WHERE Numero_Usuario = ?', [Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    //Devuelve 1 si logro eliminar el usuario indicado por id
    eliminar(Numero_Usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield this.db.query('DELETE FROM Usuarios WHERE Numero_Usuario = ?', [Numero_Usuario]))[0].affectedRows;
            console.log(user);
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
            console.log(Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario);
            const result = (yield this.db.query('INSERT INTO clases  (Id_Actividad, Id_Horario , Cupo_Clase, Numero_Usuario)   Values  (?, ?, ? ,? )', [Id_Actividad, Id_Horario, Cupo_Clase, Numero_Usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    crearClaseDias(dia) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultDias = (yield this.db.query('INSERT INTO diasclases  (Id_Dias)   Values  (?)', [dia]))[0].affectedRows;
            console.log(resultDias);
            return resultDias;
        });
    }
    listarClases() {
        return __awaiter(this, void 0, void 0, function* () {
            //const db=this.connection;
            const clases = yield this.db.query('Select * from clases JOIN Actividades ON actividades.Id_Actividad = clases.Id_Actividad JOIN Horarios ON clases.Id_Horario = horarios.Id_Horario JOIN Usuarios ON usuarios.Numero_Usuario = clases.Numero_Usuario;');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
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
            //console.log(usuarios[0]);
            console.log(dias);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return dias[0];
        });
    }
}
//Exportamos el enrutador con 
const adminModel = new AdminModel();
exports.default = adminModel;
//# sourceMappingURL=adminModel.js.map