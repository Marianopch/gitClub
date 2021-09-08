import { Router, Request, Response } from 'express';
import { createPool } from 'mysql2/promise';
import indexController from '../controller/indexController';

class IndexRoutes{
	public router: Router = Router();
	constructor(){
		this.config();
	}
	config():void{
		this.router.get('/',(req:Request,res:Response)=> {
            //res.send('Main!!!');
			//se pone antes de cargar la primera ruta, para inicializar las variables de sesiones.
			req.session.auth=false;
			req.session.user={};
            res.render("login");
        });

		this.router.post('/signin',indexController.login);
		this.router.get('/error',indexController.showError);
	}
}

//Exportamos el enrutador con 

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;