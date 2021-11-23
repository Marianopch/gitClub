import { Request, Response } from 'express';
import adminModel from '../models/adminModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";


class AdminController {

	public home(req: Request, res: Response) {
		console.log(req.body);

		// if (!req.session.auth) {
		// 	req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
		// 	res.redirect("./error");

		// }
		res.render("./adminPage/home", { mi_session: true });
	}

	public async listarSocios(req: Request, res: Response) {
		// console.log(req.header("Authorization"));

		console.log(req.session.auth, req.session.admin, req.session.habilitado)
		// if (!req.session.auth) {
        //     return res.status(401).json({ message: "Debes iniciar sesión para realizar esta acción!" });
        // }

        // if (!req.session.admin) {
        //     return res.status(401).json({ message: "Debes ser administrador para realizar esta acción!" });
        // }

		// if (!req.session.habilitado) {
        //     return res.status(401).json({ message: "Debes ser usuario activo para realizar esta acción!" });
        // }
		const  nroUsuario  = req.body;
		console.log("Controller:", nroUsuario);
		const usuarios = await adminModel.listarTodosSocios();

		return res.json(usuarios);
	}

	public mostrarFormAgregar(req: Request, res: Response) {
		res.render('adminPage/agregarSocio');
	}

	public async agregarUsuario(req: Request, res: Response) {
		const usuario = req.body;
		console.log(req.body);
		//Buscamos por numero y DNI de usuario para que no duplique Socio con Distinto numero usuario.
		const busqueda = await adminModel.buscarUsuario(usuario.Numero_Usuario, usuario.DNI_Usuario);
		if (!busqueda) {
			const result = await adminModel.crear(usuario);
			//req.flash('info', 'Socio creado correctamente');
			return res.status(200).json({ message: 'EL USUARIO FUE CREADO CORRECTAMENTE' });
			//res.render("adminPage/avisosAdmin", { fin: true });
		}

		return res.status(403).json({ message: 'EL NUMERO DE USUARIO O DNI DE USUARIO YA EXISTE' });
	}

	public async eliminar(req: Request, res: Response) {
		console.log(req.body);
		const { Numero_Usuario } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		
		const result = await adminModel.eliminar(Numero_Usuario);

		
		return res.status(200).json({ message: 'USUARIO ELIMINADO!' });
		
		
	}

	

	public async eliminarInstructor(req: Request, res: Response) {
		console.log(req.body);
		const { Numero_Usuario } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		
		const busqueda = await adminModel.buscarClaseInstructor(Numero_Usuario);
		console.log("BD: ",busqueda)
		if(busqueda===0) {

			const result = await adminModel.eliminar(Numero_Usuario);

			return res.status(200).json({ message: 'Instructor ELIMINADO!' });
			
		} else {
			
			return res.status(403).json({ message: 'NO SE PUDO ELIMINAR. Primero se debe eliminar las clases a las que esta el Instructor ASIGNADO!' });
		}
		
	}


	public async anotarActividad(req: Request, res: Response) {

		res.render('adminPage/anotarActividad');
	}


	public async modificarSocio(req: Request, res: Response) {

		const usuario = req.body;
		console.log("Controller:", req.body);

		if(usuario.Id_Estado == 2) { 

			const resultado = await adminModel.borrarClases(usuario.Numero_Usuario);
		}
		
		const result = await adminModel.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);

		return res.json(result);
	}

	public async buscarClaseSocio(req: Request, res: Response) {

		const { Numero_Usuario } = req.params;
		

		const clases = await adminModel.buscarClaseSocio(Numero_Usuario);

		return res.json(clases);
	}

	public async eliminarClaseSocio(req: Request, res: Response) {

		const { Numero_Usuario } = req.params;
		
		const { Id_Clase } = req.params;

		console.log("Controller:", Numero_Usuario, " " ,Id_Clase)
		const clases = await adminModel.eliminarClaseSocio(Numero_Usuario, Id_Clase);

		return res.json(clases);
	}


	//MENU ACTIVIDADES
	public async listarActividad(req: Request, res: Response) {
		console.log(req.body);

		const actividades = await adminModel.listarTodasActividades();

		return res.json(actividades);
	}

	public mostrarFormActividad(req: Request, res: Response) {
		res.render('adminPage/actividades/agregarActividad');
	}

	public async agregarActividad(req: Request, res: Response) {
		const actividades = req.body;
		console.log(req.body);

		const busqueda = await adminModel.buscarActividad(actividades.descripcion);
		if (!busqueda) {
			const result = await adminModel.crearActividad(actividades.descripcion);
			return res.status(200).json({ message: "Actividad creada" });
		}
		return res.status(403).json({ message: 'Ya existe esa actividad' });
	}

	public async eliminarActividad(req: Request, res: Response) {

		const { Id_Actividad } = req.params; 

		const busqueda = await adminModel.buscarClaseActividad(Id_Actividad);

		if(!busqueda) {

			const result = await adminModel.eliminarActividad(Id_Actividad);

			return res.status(200).json({ message: 'Actividad ELIMINADA!' });
			
		} else {
			
			return res.status(403).json({ message: 'NO SE PUDO ELIMINAR. Primero se debe eliminar las clases que consuman dicha actividad!' });
		}

		


	}

	public async modificarActividad(req: Request, res: Response) {
		console.log(req.body);
		const { Id_Actividad } = req.params;
		const { Descripcion_Actividad } = req.body;
		const result = await adminModel.modificarActividad(Id_Actividad, Descripcion_Actividad);
		res.redirect('../buscarActividad');
	}

	public showError(req: Request, res: Response) {
		// res.send({ "Usuario y/o contraseña incorrectos": req.body });
		res.render("partials/error");
	}

	public endSession(req: Request, res: Response) {
		console.log(req.body);
		req.session.user = {};
		req.session.auth = false;
		req.session.admin = false;
		req.session.destroy(() => console.log("Session finalizada"));
		res.redirect("/");
	}

	//MENU CLASE
	public async listarHorarios(req: Request, res: Response) {
		console.log(req.body);

		const horarios = await adminModel.listarHorarios();

		return res.json(horarios);
	}

	public async listarDias(req: Request, res: Response) {
		console.log(req.body);

		const dias = await adminModel.listarDias();

		return res.json(dias);
	}

	public async agregarClase(req: Request, res: Response) {
		const clase = req.body;

		const buscarClase = await adminModel.buscarClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario)

		if(!buscarClase) {

			const creacion = await adminModel.crearClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);

			//Obtengo el Id de la Clase Creada
			const consultaID = await adminModel.consultaIDClase(clase.Id_Actividad, clase.Id_Horario, clase.Cupo_Clase, clase.Numero_Usuario);
		
			for ( var val of clase.Id_Dias) {
				const resultdias = await adminModel.crearClaseDias(consultaID[0].Id_Clase, val);
				console.log("Controller", resultdias);
			}

			return res.status(200).json({ message: "La clase fue creada correctamente." });
		}
		
		return res.status(403).json({ message: "La clase ya existe, no se creo la clase." });

	}

	public async buscarClase(req: Request, res: Response) {
		console.log(req.body);

		const clases = await adminModel.listarClases();

		return res.json(clases);
	}

	public async listarInstructoresActivos(req: Request, res: Response) {
		console.log(req.body);

		const usuarios = await adminModel.listarTodosInstructoresActivos();
		console.log(usuarios);
		return res.json(usuarios);
	}

	public async eliminarClase (req: Request, res: Response) {
		

		const { id } = req.params; 


		const busqueda = await adminModel.buscarInscriptosClase(id);

		if(busqueda === 0) {
			//console.log("CN Busqueda", busqueda[0].Id_Clase)
			const result = await adminModel.eliminarClase(id);

			return res.status(200).json({ message: 'Clase ELIMINADA!' });

		} else {

			const eliminados = await adminModel.eliminarSociosdeClase(id)

			const result = await adminModel.eliminarClase(id);

			return res.status(200).json({ message: 'Se elimino los Socios inscriptos a la clase Y la clase!!' });
		}

	}



	//MENU INSTRUCTORES
	public async listarInstructores(req: Request, res: Response) {
		console.log(req.body);

		const usuarios = await adminModel.listarTodosInstructores();
		const users = usuarios;

		return res.json(usuarios);
	}

	public async buscarClaseInstructor(req: Request, res: Response) {

		const { id } = req.params;
		
		const clases = await adminModel.buscarClaseInstructores(id);
		
		return res.json(clases);
	}

	public async modificarInstructor(req: Request, res: Response) {

		const usuario = req.body;
		console.log("Controller:", usuario.Numero_Usuario);

		if(usuario.Id_Estado == 2) { 

			const buscarIdClases = await adminModel.buscarClasesdeIntr(usuario.Numero_Usuario);
			console.log("Buscar clase:", buscarIdClases);

			if (buscarIdClases === 0 ) {

				const result = await adminModel.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);

				return res.status(200).json({ message: 'Se modificaron los datos!' });

			} else {

				return res.status(403).json({ message: 'No se modifico, primero se deberian eliminar las clases que el instructor esta dando.' });
			}

		}
		
		const result = await adminModel.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario, usuario.Direccion_Usuario, usuario.Password_Usuario, usuario.Id_Estado);

		return res.status(200).json({ message: 'Se modificaron los datos!!!' });

	}


	//MENU ADMIN

	public async listarAdmin(req: Request, res: Response) {
		console.log(req.body);

		const usuarios = await adminModel.listarTodosAdmin();
		return res.json(usuarios);
	}

	public mostrarFormAgregarAdmin(req: Request, res: Response) {
		res.render('adminPage/admins/agregarAdmin');
	}

	//Comentarios
	public async listComent(req: Request, res: Response) {
		console.log(req.header("Authorization"));
		//console.log(req.header("Authorization"));
		console.log(req.body);
		const comentario = await adminModel.listarComentario();
		console.log(comentario);
		return res.json(comentario);
	}


	public async createComent(req: Request, res: Response) {
		console.log(req.header("Authorization"));
		//console.log(req.header("Authorization"));
		const comentario = req.body;
		console.log("Controller:", req.body);
		if(comentario.Descripcion_Comentario.lenght == 0 || comentario.Descripcion_Comentario.lenght > 1000){
			 res.json ({ message: 'Comentario no guardado!!' });
		}
		// if(comentario.Imagen_Comentario.lenght == 0){
		// 	res.json ({ message: 'Comentario no guardado!!' });
		// }
		
		const result = await adminModel.crearComentario(comentario);

		return res.status(200).json({ message: 'Comentario saved!!' });

	}

	public async deleteComent(req: Request, res: Response) {
		//console.log(req.header("Authorization"));
		console.log(req.header("Authorization"));


		const { Id_Comentario } = req.params; 
		console.log("controller:", Id_Comentario);
		const result = await adminModel.eliminarComentario(Id_Comentario);
		return res.json({ text: 'Comentario Eliminado: ' + Id_Comentario });

	}

	public async buscarEstados(req: Request, res: Response) {
		console.log(req.body);

		const estados = await adminModel.buscarEstados();

		return res.json(estados);
	}

	public async buscarUsuario(req: Request, res: Response) {

		const { Numero_Usuario } = req.params; 

		const usuario = await adminModel.findUser(Numero_Usuario);

		return res.json(usuario);
	}




}

const adminController = new AdminController();
export default adminController;