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
const indexModel_1 = __importDefault(require("../models/indexModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class IndexController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Numero_Usuario, Password_Usuario } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const usuario = Numero_Usuario;
            const password = Password_Usuario;
            const result = yield indexModel_1.default.buscarNombre(usuario);
            // console.log(usuario);
            // console.log(password);
            // console.log(result);
            if (!result)
                return res.status(404).json({ message: "Usuario no registrado" });
            // console.log(result.Numero_Usuario);
            // console.log(result.Password_Usuario);
            if ((result === null || result === void 0 ? void 0 : result.Numero_Usuario) == usuario && (result === null || result === void 0 ? void 0 : result.Password_Usuario) == password) {
                req.session.user = result;
                console.log("Session:", req.session.user);
                req.session.auth = true;
                // console.log("Rol:", result.rol);
                // if (result?.rol === "admin") {
                //     req.session.admin = true;
                //     //    return res.redirect("../admin/home")
                // } else {
                //     req.session.admin = false;
                // }
                if ((result === null || result === void 0 ? void 0 : result.Id_Rol) === "1") {
                    req.session.admin = true;
                    //    return res.redirect("../admin/home")
                }
                else {
                    req.session.admin = false;
                }
                //res.redirect("./home");
                const token = jsonwebtoken_1.default.sign({ _id: result.id }, "secretKey");
                res.status(200).json({ message: "Bienvenido " + result.Numero_Usuario, token: token, rol: result.Id_Rol });
                //res.status(200).json({ message: "Bienvenido " + result.Nombre_Usuario });
                return;
            }
            res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
            //res.send({ "Usuario y/o contraseña incorrectos": req.body });
            //req.flash("error_session", "Usuario y/o Password Incorrectos");
            //res.redirect("./error");
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
}
const indexController = new IndexController();
exports.default = indexController;
//# sourceMappingURL=indexController.js.map