import { Router, Request, Response } from 'express';
import adminController from '../controller/adminController';
import { TokenValidation } from '../lib/verifyToken';

class AdminRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            
            req.session.user = {};
            req.session.auth = false;
            req.session.admin = false;
            req.session.habilitado = false;
            res.send('Main!!!');
        });

        this.router.get('/home', adminController.home);
        this.router.post('/home', adminController.home);

        //Menu Socios.
        //Buscar
        this.router.get('/find/:Numero_Usuario', adminController.buscarUsuario);
        this.router.get('/buscarSocio', adminController.listarSocios);
        //Agregar
        this.router.post('/signup', adminController.agregarUsuario);
        this.router.get('/signup', adminController.mostrarFormAgregar);
        //Eliminar
        this.router.delete('/eliminarSocio/:Numero_Usuario', adminController.eliminar)
        //Modificar
        this.router.put('/modificarSocio/:Numero_Usuario', adminController.modificarSocio);
        this.router.get('/buscarClaseSocio/:Numero_Usuario', adminController.buscarClaseSocio);
        this.router.delete('/eliminarClaseUser/:Numero_Usuario/:Id_Clase', adminController.eliminarClaseSocio)

        //Menu Activades.
        //Buscar
        this.router.get('/buscarActividad', adminController.listarActividad);
        //Agregar
        this.router.post('/agregarActividad', adminController.agregarActividad);
        this.router.get('/agregarActividad', adminController.mostrarFormActividad);
        //Eliminar
        this.router.delete('/eliminarActividad/:Id_Actividad', adminController.eliminarActividad);
        //Modificar
        this.router.put('/modificarActividad/:Id_Actividad', adminController.modificarActividad);


        //Menu Instructores
        //Buscar
        this.router.get('/buscarInstructor', adminController.listarInstructores);
        //Agregar
        this.router.post('/agregarInstructor', adminController.agregarUsuario);
        //this.router.get('/agregarInstructor', adminController.mostrarFormInstructores);
        //Eliminar
        this.router.get('/eliminarInstructor/:Numero_Usuario', adminController.eliminar)
        //Modificar
        this.router.put('/modificarInstructor/:id', adminController.modificarInstructor);
        this.router.get('/buscarClaseInstructor/:id', adminController.buscarClaseInstructor)

        

        //Menu Admin
        //Buscar
        this.router.get('/buscarAdmin', adminController.listarAdmin);
        //Agregar
        this.router.post('/agregarAdmin' ,adminController.agregarUsuario);
        this.router.get('/agregarAdmin', adminController.mostrarFormAgregarAdmin);
        //Eliminar
        this.router.delete('/eliminarAdmin/:Numero_Usuario', adminController.eliminar)
        //Modificar
        this.router.put('/modificarAdmin/:Numero_Usuario', adminController.modificarSocio);

        //Menu Clase
        this.router.get('/buscarhorarios', adminController.listarHorarios);
        this.router.post('/agregarClase', adminController.agregarClase);
        this.router.get('/buscarClase', adminController.buscarClase);
        this.router.get('/buscardias', adminController.listarDias);
        this.router.delete('/eliminarClase/:id', adminController.eliminarClase)

        //Socio-Actividad
        this.router.post('/notarActividad', adminController.anotarActividad);

        this.router.get('/error', adminController.showError);
        //this.router.get('/buscarSocio',adminController.buscarSocio);

        //Comentarios
        this.router.get('/list',TokenValidation, adminController.listComent);
		this.router.post('/create',TokenValidation, adminController.createComent);
		this.router.delete('/delete/:Id_Comentario',TokenValidation, adminController.deleteComent);
        
        this.router.get('/buscarEstados', adminController.buscarEstados);
    }

}
//Exportamos el enrutador con 

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;