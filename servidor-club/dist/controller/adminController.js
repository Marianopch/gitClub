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
            console.log(req.header("Authorization"));
            //  let nroUsuario = localStorage.getItem('Usuario');
            //  console.log(nroUsuario);
            // console.log(req.body); 
            // const { nroUsuario } = req.params;
            // console.log("Controller:", nroUsuario);
            //const { Numero_Usuario } = req.params
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
            console.log("Controller:", req.body);
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
            let datosClase = clase[0];
            let clasedias = clase[1];
            switch (clasedias.length) {
                case 1:
                    let dia = clasedias[0];
                    //const busquedaClase = await adminModel.buscarClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
                    //if (!busquedaClase) {
                    const result = yield adminModel_1.default.crearClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
                    //if
                    const Id_Clase = yield adminModel_1.default.consultaIDClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
                    //falta consutlar el ID de la clase.
                    //console.log("Id Clase", {Id_Clase} );
                    let value = Object.keys(Id_Clase);
                    console.log(value); // 'one'
                    const resultdias = yield adminModel_1.default.crearClaseDias(Id_Clase, dia); //falta enviar el id de la clase.
                    console.log(result);
                    console.log(resultdias);
                    return res.status(200).json({ message: 'Clase saved!!' });
                    //}
                    return res.status(403).json({ message: 'Clase exists!!' });
                    break;
                case 0:
                    dia = clase.diasSelect[0];
                    let dia1 = clase.diasSelect[1];
                    break;
                case 2:
                    dia = clase.diasSelect[0];
                    dia1 = clase.diasSelect[1];
                    let dia2 = clase.diasSelect[2];
                    break;
                case 3:
                    dia = clase.diasSelect[0];
                    dia1 = clase.diasSelect[1];
                    dia2 = clase.diasSelect[2];
                    let dia3 = clase.diasSelect[3];
                    break;
                case 4:
                    dia = clase.diasSelect[0];
                    dia1 = clase.diasSelect[1];
                    dia2 = clase.diasSelect[2];
                    dia3 = clase.diasSelect[3];
                    let dia4 = clase.diasSelect[4];
                    break;
                case 5:
                    dia = clase.diasSelect[0];
                    dia1 = clase.diasSelect[1];
                    dia2 = clase.diasSelect[2];
                    dia3 = clase.diasSelect[3];
                    dia4 = clase.diasSelect[4];
                    let dia5 = clase.diasSelect[5];
                    break;
                case 6:
                    dia = clase.diasSelect[0];
                    dia1 = clase.diasSelect[1];
                    dia2 = clase.diasSelect[2];
                    dia3 = clase.diasSelect[3];
                    dia4 = clase.diasSelect[4];
                    dia5 = clase.diasSelect[6];
                    let dia6 = clase.diasSelect[6];
                    break;
            }
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