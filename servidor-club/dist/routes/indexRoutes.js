"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controller/indexController"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            //res.send('Main!!!');
            //se pone antes de cargar la primera ruta, para inicializar las variables de sesiones.
            req.session.auth = false;
            req.session.user = {};
            res.render("login");
        });
        this.router.post('/signin', indexController_1.default.login);
        this.router.get('/error', indexController_1.default.showError);
    }
}
//Exportamos el enrutador con 
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=indexRoutes.js.map