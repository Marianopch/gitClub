"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulosController_1 = __importDefault(require("../controller/articulosController"));
class ArticulosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        this.router.get('/listar', articulosController_1.default.list);
        this.router.post('/listar', articulosController_1.default.comprar);
    }
}
const articulosRoutes = new ArticulosRoutes();
exports.default = articulosRoutes.router;
//# sourceMappingURL=articulosRoutes.js.map