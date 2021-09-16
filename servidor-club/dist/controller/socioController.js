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
    clasesLu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseLu();
            return res.json(usuarios);
        });
    }
    clasesMa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseMa();
            return res.json(usuarios);
        });
    }
    clasesMi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseMi();
            return res.json(usuarios);
        });
    }
    clasesJu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseJu();
            return res.json(usuarios);
        });
    }
    clasesVi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseVi();
            return res.json(usuarios);
        });
    }
    clasesSa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseSa();
            return res.json(usuarios);
        });
    }
    clasesDo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield socioModel_1.default.listarClaseDo();
            return res.json(usuarios);
        });
    }
    //SocioPage - MiPerfil Sector 
    miperfil(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { Numero_Usuario } = req.body;
            console.log(Numero_Usuario);
            const datosusuario = yield socioModel_1.default.verDatosUser(Numero_Usuario);
            console.log(datosusuario);
            return res.json(datosusuario);
        });
    }
}
const socioController = new SocioController();
exports.default = socioController;
//# sourceMappingURL=socioController.js.map