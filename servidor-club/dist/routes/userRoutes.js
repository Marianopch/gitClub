"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        // this.router.get('/signin',(req:Request,res:Response)=> {
        //     res.send('Sign In!!!');
        //     //res.render("partials/principal");
        // });  
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login);
        //registro
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', userController_1.default.addUser);
        //Home del usuario
        this.router.get('/home', userController_1.default.home);
        this.router.post('/home', userController_1.default.process);
        //CRUD
        //this.router.get('/list',userController.list);
        this.router.get('/find/:id', userController_1.default.find);
        this.router.post('/add', userController_1.default.addUser);
        //this.router.put('/update/:id',userController.update);
        this.router.delete('/delete/:id', userController_1.default.delete);
        //FIN CRUD
        this.router.get('/controls', userController_1.default.control);
        this.router.post('/procesar', userController_1.default.procesar);
        // this.router.get('/listar',userController.list);
        this.router.get('/salir', userController_1.default.endSession);
        this.router.get('/error', userController_1.default.showError);
        this.router.get('/delete/:id', userController_1.default.delete);
        //sin formulario
        //this.router.get('/update/:id',userController.update);
        //con formulario
        //this.router.post('/update',userController.update);
        this.router.get('/modificar/:id', userController_1.default.controlUpdate);
        this.router.post('/modificando', userController_1.default.controlModificar);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map