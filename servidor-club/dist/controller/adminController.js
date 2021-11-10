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
            // console.log(req.header("Authorization"));
            console.log(req.session.auth, req.session.admin, req.session.habilitado);
            // if (!req.session.auth) {
            //     return res.status(401).json({ message: "Debes iniciar sesión para realizar esta acción!" });
            // }
            // if (!req.session.admin) {
            //     return res.status(401).json({ message: "Debes ser administrador para realizar esta acción!" });
            // }
            // if (!req.session.habilitado) {
            //     return res.status(401).json({ message: "Debes ser usuario activo para realizar esta acción!" });
            // }
            const nroUsuario = req.body;
            console.log("Controller:", nroUsuario);
            const usuarios = yield adminModel_1.default.listarTodosSocios();
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
            console.log("Controller:", req.body);
            if (usuario.Id_Estado == 2) {
                const resultado = yield adminModel_1.default.borrarClases(usuario.Numero_Usuario);
            }
            const result = yield adminModel_1.default.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);
            return res.json(result);
        });
    }
    buscarClaseSocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Numero_Usuario } = req.params;
            const clases = yield adminModel_1.default.buscarClaseSocio(Numero_Usuario);
            return res.json(clases);
        });
    }
    eliminarClaseSocio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Numero_Usuario } = req.params;
            const { Id_Clase } = req.params;
            console.log("Controller:", Numero_Usuario, " ", Id_Clase);
            const clases = yield adminModel_1.default.eliminarClaseSocio(Numero_Usuario, Id_Clase);
            return res.json(clases);
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
                return res.status(200).json({ message: "Actividad creada" });
            }
            return res.status(403).json({ message: 'Ya existe esa actividad' });
        });
    }
    eliminarActividad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Id_Actividad } = req.params;
            const busqueda = yield adminModel_1.default.buscarClaseActividad(Id_Actividad);
            if (!busqueda) {
                const result = yield adminModel_1.default.eliminarActividad(Id_Actividad);
                return res.status(200).json({ message: 'Actividad ELIMINADA!' });
            }
            else {
                return res.status(403).json({ message: 'NO SE PUDO ELIMINAR. Primero se debe eliminar las clases que consuman dicha actividad!' });
            }
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
        req.session.admin = false;
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
            const buscarClase = yield adminModel_1.default.buscarClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
            if (!buscarClase) {
                const creacion = yield adminModel_1.default.crearClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
                //Obtengo el Id de la Clase Creada
                const consultaID = yield adminModel_1.default.consultaIDClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
                for (var val of clase.Id_Dias) {
                    const resultdias = yield adminModel_1.default.crearClaseDias(consultaID[0].Id_Clase, val);
                    console.log("Controller", resultdias);
                }
                return res.status(200).json({ message: "La clase fue creada correctamente." });
            }
            return res.status(403).json({ message: "La clase ya existe, no se creo la clase." });
        });
    }
    buscarClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const clases = yield adminModel_1.default.listarClases();
            return res.json(clases);
        });
    }
    listarInstructoresActivos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield adminModel_1.default.listarTodosInstructoresActivos();
            console.log(usuarios);
            return res.json(usuarios);
        });
    }
    eliminarClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const busqueda = yield adminModel_1.default.buscarInscriptosClase(id);
            if (busqueda === 0) {
                //console.log("CN Busqueda", busqueda[0].Id_Clase)
                const result = yield adminModel_1.default.eliminarClase(id);
                return res.status(200).json({ message: 'Clase ELIMINADA!' });
            }
            else {
                const eliminados = yield adminModel_1.default.eliminarSociosdeClase(id);
                const result = yield adminModel_1.default.eliminarClase(id);
                return res.status(200).json({ message: 'Se elimino los Socios inscriptos a la clase Y la clase!!' });
            }
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
    buscarClaseInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const clases = yield adminModel_1.default.buscarClaseInstructores(id);
            return res.json(clases);
        });
    }
    modificarInstructor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            console.log("Controller:", usuario.Numero_Usuario);
            if (usuario.Id_Estado == 2) {
                const buscarIdClases = yield adminModel_1.default.buscarClasesdeIntr(usuario.Numero_Usuario);
                console.log("Buscar clase:", buscarIdClases);
                if (buscarIdClases === 0) {
                    const result = yield adminModel_1.default.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);
                    return res.status(200).json({ message: 'Se modificaron los datos!' });
                }
                else {
                    return res.status(403).json({ message: 'No se modifico, primero se deberian eliminar las clases que el instructor esta dando.' });
                }
            }
            const result = yield adminModel_1.default.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);
            return res.status(200).json({ message: 'Se modificaron los datos!!!' });
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
    //Comentarios
    listComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            //console.log(req.header("Authorization"));
            console.log(req.body);
            const comentario = yield adminModel_1.default.listarComentario();
            console.log(comentario);
            return res.json(comentario);
        });
    }
    createComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            //console.log(req.header("Authorization"));
            const comentario = req.body;
            console.log("Controller:", req.body);
            if (comentario.Descripcion_Comentario.lenght == 0 || comentario.Descripcion_Comentario.lenght > 1000) {
                res.json({ message: 'Comentario no guardado!!' });
            }
            // if(comentario.Imagen_Comentario.lenght == 0){
            // 	res.json ({ message: 'Comentario no guardado!!' });
            // }
            const result = yield adminModel_1.default.crearComentario(comentario);
            return res.status(200).json({ message: 'Comentario saved!!' });
        });
    }
    deleteComent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.header("Authorization"));
            console.log(req.header("Authorization"));
            const { Id_Comentario } = req.params;
            console.log("controller:", Id_Comentario);
            const result = yield adminModel_1.default.eliminarComentario(Id_Comentario);
            return res.json({ text: 'Comentario Eliminado: ' + Id_Comentario });
        });
    }
    buscarEstados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const estados = yield adminModel_1.default.buscarEstados();
            return res.json(estados);
        });
    }
    buscarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Numero_Usuario } = req.params;
            const usuario = yield adminModel_1.default.findUser(Numero_Usuario);
            return res.json(usuario);
        });
    }
}
const adminController = new AdminController();
exports.default = adminController;
//# sourceMappingURL=adminController.js.map