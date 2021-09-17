import { Router, Request, Response } from 'express';
import socioController from '../controller/socioController';


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
        this.router.get('/clasesLu', socioController.clasesLu);
        this.router.get('/clasesMa', socioController.clasesMa);
        this.router.get('/clasesMi', socioController.clasesMi);
        this.router.get('/clasesJu', socioController.clasesJu);
        this.router.get('/clasesVi', socioController.clasesVi);
        this.router.get('/clasesSa', socioController.clasesSa);
        this.router.get('/clasesDo', socioController.clasesDo);

        this.router.get('/calendar', socioController.verInfoClase);

        //SocioPage - MiPerfil Sector 
        this.router.get('/miperfil/:Numero_Usuario', socioController.miperfil);


    }

}
//Exportamos el enrutador con 

const socioRoutes = new SocioRoutes();
export default socioRoutes.router;