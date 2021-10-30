import { Router, Request, Response } from 'express';
import socioController from '../controller/socioController';
import { TokenValidation } from '../lib/verifytoken';

class SocioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });

        //SocioPage - Calendar Sector - Inscripcion
        this.router.get('/clasesTotales', socioController.clasesTotales);

        this.router.get('/llenarCalendar/:Descripcion_Actividad', socioController.llenarCalendar);

        this.router.get('/calendar/:Id_Clase', socioController.verInfoClase);

        this.router.post('/calendar/inscripcion', socioController.inscripcionSocioClase)

        //SocioPage - MiPerfil Sector 
        this.router.get('/miperfil/:Numero_Usuario', socioController.miperfil);

        //SocioPage - MisActividades Sector 
        this.router.get('/buscarActividades/:Numero_Usuario' ,socioController.misActividades);

        //Comentarios
        this.router.get('/list', socioController.listComent);

    }

}
//Exportamos el enrutador con 

const socioRoutes = new SocioRoutes();
export default socioRoutes.router;