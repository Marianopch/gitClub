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
const adminModel_1 = __importDefault(require("../models/adminModel"));
class AdminController {
    home(req, res) {
        console.log(req.body);
        // if (!req.session.auth) {
        // 	req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
        // 	res.redirect("./error");
        // }
        res.render("./adminPage/home", { mi_session: true });
    }
    listarSocios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield adminModel_1.default.listarTodosSocios();
            //const users = usuarios;
            // if (!req.session.auth) {
            // 	req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            // 	res.redirect("./error");
            // 	//res.redirect("/");
            // }
            //res.render('adminPage/buscarSocio', { users: usuarios, mi_session: true });
            return res.json(usuarios);
        });
    }
    mostrarFormAgregar(req, res) {
        res.render('adminPage/agregarSocio');
    }
    agregarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            console.log(req.body);
            //Buscamos por numero y DNI de usuario para que no duplique Socio con Distinto numero usuario.
            const busqueda = yield adminModel_1.default.buscarUsuario(usuario.Numero_Usuario, usuario.DNI_Usuario);
            if (!busqueda) {
                const result = yield adminModel_1.default.crear(usuario);
                //req.flash('info', 'Socio creado correctamente');
                return res.status(200).json({ message: 'User saved!!' });
                //res.render("adminPage/avisosAdmin", { fin: true });
            }
            return res.status(403).json({ message: 'User exists!!' });
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { Numero_Usuario } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield adminModel_1.default.eliminar(Numero_Usuario);
            return res.status(200).json({ message: 'USUARIO ELIMINADO!' });
        });
    }
    anotarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('adminPage/anotarActividad');
        });
    }
    modificarSocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            console.log(req.body);
            console.log(req.params);
            // const { Numero_Usuario } = req.params
            // const { Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario } = req.body;
            // const result = await adminModel.actualizar(Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario);
            // const { Numero_Usuario } = req.params;
            const result = yield adminModel_1.default.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Direccion_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario);
            // req.flash('info', 'Socio modificado correctamente');
            // res.redirect('../buscarSocio');
            return res.json(result);
        });
    }
    //MENU ACTIVIDADES
    listarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const actividades = yield adminModel_1.default.listarTodasActividades();
            return res.json(actividades);
        });
    }
    mostrarFormActividad(req, res) {
        res.render('adminPage/actividades/agregarActividad');
    }
    agregarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const actividades = req.body;
            console.log(req.body);
            const busqueda = yield adminModel_1.default.buscarActividad(actividades.descripcion);
            if (!busqueda) {
                const result = yield adminModel_1.default.crearActividad(actividades.descripcion);
                return res.status(200).json({ message: 'User saved!!' });
            }
            return res.status(403).json({ message: 'User exists!!' });
        });
    }
    eliminarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { Id_Actividad } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield adminModel_1.default.eliminarActividad(Id_Actividad);
            return res.status(200).json({ message: 'Actividad ELIMINADA!' });
        });
    }
    modificarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { Id_Actividad } = req.params;
            const { Descripcion_Actividad } = req.body;
            const result = yield adminModel_1.default.modificarActividad(Id_Actividad, Descripcion_Actividad);
            res.redirect('../buscarActividad');
        });
    }
    showError(req, res) {
        // res.send({ "Usuario y/o contraseña incorrectos": req.body });
        res.render("partials/error");
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
    //MENU CLASE
    listarHorarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const horarios = yield adminModel_1.default.listarHorarios();
            return res.json(horarios);
        });
    }
    listarDias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const dias = yield adminModel_1.default.listarDias();
            return res.json(dias);
        });
    }
    agregarClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clase = req.body;
            console.log(clase);
            // for( let i = 0; i < clase.Id_Dias.length; ++ ) {
            // }
            const busquedaClase = yield adminModel_1.default.buscarClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
            if (!busquedaClase) {
                const result = yield adminModel_1.default.crearClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
                const resultdias = yield adminModel_1.default.crearClaseDias(clase.Id_Dias);
                console.log(result);
                console.log(resultdias);
                return res.status(200).json({ message: 'Clase saved!!' });
            }
            return res.status(403).json({ message: 'Clase exists!!' });
        });
    }
    buscarClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const clases = yield adminModel_1.default.listarClases();
            return res.json(clases);
        });
    }
    //MENU INSTRUCTORES
    listarInstructores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield adminModel_1.default.listarTodosInstructores();
            const users = usuarios;
            return res.json(usuarios);
        });
    }
    //MENU ADMIN
    listarAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield adminModel_1.default.listarTodosAdmin();
            return res.json(usuarios);
        });
    }
    mostrarFormAgregarAdmin(req, res) {
        res.render('adminPage/admins/agregarAdmin');
    }
}
const adminController = new AdminController();
exports.default = adminController;
//# sourceMappingURL=adminController.js.map