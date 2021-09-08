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
const articulosModel_1 = __importDefault(require("../models/articulosModel"));
class ArticulosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield articulosModel_1.default.listar();
            const users = usuarios;
            if (!req.session.auth) {
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
                //res.redirect("/");
            }
            const variedades = yield articulosModel_1.default.listar();
            console.log(variedades);
            ///return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
            res.render('partials/listar', { variedades: variedades, mi_session: true });
        });
    }
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Controles');
            const usuarios = yield articulosModel_1.default.listar();
            const users = usuarios;
            if (!req.session.auth) {
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
                //res.redirect("/");
            }
            res.render('partials/controls', { users: usuarios, mi_session: true });
            //res.render('partials/controls', { users: {} });
        });
    }
    comprar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            // if (!req.session.auth) {
            // 	req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            // 	res.redirect("./error");
            // }
            const { id } = req.params;
            console.log("id -> ", id);
            console.log(req.body);
            req.session.user.push({
                "id": id,
                "cantidad": req.body.cantidad
            });
            console.log(req.session.user);
            res.redirect('../listar');
            // let variedad = req.body.variedad;
            // var variedades: any = [];
            // console.log(variedad);
            // variedades.push(variedad);
            //if (variedades !== undefined) {
            //for (let elemento of variedades) {
            //const encontrado = await articulosModel.buscarId(elemento);
            //	if (encontrado) {
            // req.session.user.push(variedad);
            // console.log(variedad);
            //}
            //}
            //}
            //res.redirect("/");
            // console.log(variedades);
            // ///res.render('partials/procesar');
            // //console.log(req.session.user);
            // //res.redirect('../listar');
            // res.render("partials/listar", { variedades, home: req.session.user, mi_session: true });
        });
    }
}
const articulosController = new ArticulosController();
exports.default = articulosController;
//# sourceMappingURL=articulosController.js.map