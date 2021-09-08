"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraController_1 = __importDefault(require("../controller/compraController"));
class CompraRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        this.router.get('/listar', compraController_1.default.list);
    }
}
const userRoutes = new CompraRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=compraRoutes.js.map