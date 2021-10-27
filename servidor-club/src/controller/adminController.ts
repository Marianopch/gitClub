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
		console.log(req.body);

		const usuarios = await adminModel.listarTodosSocios();
		//const users = usuarios;
		// if (!req.session.auth) {
		// 	req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
		// 	res.redirect("./error");
		// 	//res.redirect("/");
		// }
		//res.render('adminPage/buscarSocio', { users: usuarios, mi_session: true });
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
			return res.status(200).json({ message: 'User saved!!' });
			//res.render("adminPage/avisosAdmin", { fin: true });
		}

		return res.status(403).json({ message: 'User exists!!' });
	}

	public async eliminar(req: Request, res: Response) {
		console.log(req.body);
		const { Numero_Usuario } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.

		const result = await adminModel.eliminar(Numero_Usuario);


		return res.status(200).json({ message: 'USUARIO ELIMINADO!' });
	}

	public async anotarActividad(req: Request, res: Response) {

		res.render('adminPage/anotarActividad');
	}


	public async modificarSocio(req: Request, res: Response) {

		const usuario = req.body;
		console.log(req.body);
		console.log(req.params);
		
		// const { Numero_Usuario } = req.params
		// const { Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario } = req.body;
		// const result = await adminModel.actualizar(Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario);
		// const { Numero_Usuario } = req.params;
		const result = await adminModel.actualizar(usuario.Numero_Usuario, usuario.Nombre_Usuario, usuario.Apellido_Usuario, usuario.DNI_Usuario, usuario.Direccion_Usuario, usuario.Mail_Usuario, usuario.Telefono_Usuario);
		// req.flash('info', 'Socio modificado correctamente');
		// res.redirect('../buscarSocio');
		return res.json(result);
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
			return res.status(200).json({ message: 'User saved!!' });
		}
		return res.status(403).json({ message: 'User exists!!' });
	}

	public async eliminarActividad(req: Request, res: Response) {
		console.log(req.body);
		const { Id_Actividad } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
		const result = await adminModel.eliminarActividad(Id_Actividad);

		return res.status(200).json({ message: 'Actividad ELIMINADA!' });
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
		let datosClase = clase[0];

		let clasedias = clase[1];


		switch (clasedias.length) {
			case 1:
				let dia = clasedias[0];
				//const busquedaClase = await adminModel.buscarClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
				//if (!busquedaClase) {

					const result = await adminModel.crearClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
					
					//if
					
					const Id_Clase = await adminModel.consultaIDClase(datosClase.Id_Actividad, datosClase.Id_Horario, datosClase.Cupo_Clase, datosClase.Numero_Usuario);
					//falta consutlar el ID de la clase.

					//console.log("Id Clase", {Id_Clase} );
					let value = Object.keys(Id_Clase);

					console.log(value); // 'one'



					const resultdias = await adminModel.crearClaseDias(Id_Clase, dia);//falta enviar el id de la clase.
		
					console.log(result);
		
					console.log(resultdias);
		
					return res.status(200).json({ message: 'Clase saved!!' });
				//}
				return res.status(403).json({ message: 'Clase exists!!' });
				break;
			case 0:
				dia = clase.diasSelect[0];
				let dia1 = clase.diasSelect[1];
				break;
			case 2:
				dia = clase.diasSelect[0];
				dia1 = clase.diasSelect[1];
				let dia2 = clase.diasSelect[2];
				break;
			case 3:
				dia = clase.diasSelect[0];
				dia1 = clase.diasSelect[1];
				dia2 = clase.diasSelect[2];
				let dia3 = clase.diasSelect[3];
				break;
			case 4:
				dia = clase.diasSelect[0];
				dia1 = clase.diasSelect[1];
				dia2 = clase.diasSelect[2];
				dia3 = clase.diasSelect[3];
				let dia4 = clase.diasSelect[4];
				break;
			case 5:
				dia = clase.diasSelect[0];
				dia1 = clase.diasSelect[1];
				dia2 = clase.diasSelect[2];
				dia3 = clase.diasSelect[3];
				dia4 = clase.diasSelect[4];
				let dia5 = clase.diasSelect[5];
				break;
			case 6:
				dia = clase.diasSelect[0];
				dia1 = clase.diasSelect[1];
				dia2 = clase.diasSelect[2];
				dia3 = clase.diasSelect[3];
				dia4 = clase.diasSelect[4];
				dia5 = clase.diasSelect[6];
				let dia6 = clase.diasSelect[6];
				break;
		}
	}

	public async buscarClase(req: Request, res: Response) {
		console.log(req.body);

		const clases = await adminModel.listarClases();

		return res.json(clases);
	}



	//MENU INSTRUCTORES
	public async listarInstructores(req: Request, res: Response) {
		console.log(req.body);

		const usuarios = await adminModel.listarTodosInstructores();
		const users = usuarios;

		return res.json(usuarios);
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
		//console.log(req.header("Authorization"));
		console.log(req.body);
		const comentario = await adminModel.listarComentario();
		console.log(comentario);
		return res.json(comentario);
	}


	public async createComent(req: Request, res: Response) {
		//console.log(req.header("Authorization"));
		const comentario = req.body;
		console.log(req.body);
		if(comentario.Descripcion_Comentario.length == 0 || comentario.Descripcion_Comentario.length > 1000){
			 res.json ({ message: 'Comentario no guardado!!' });
		}
		if(comentario.Imagen_Comentario.length == 0){
			res.json ({ message: 'Comentario no guardado!!' });
		}
		
		const result = await adminModel.crearComentario(comentario);

		return res.status(200).json({ message: 'Comentario saved!!' });

	}

	public async deleteComent(req: Request, res: Response) {
		//console.log(req.header("Authorization"));

		console.log(req.body);
		const { id } = req.params; 
		const result = await adminModel.eliminarComentario(id);
		return res.json({ text: 'deleting a user ' + id });

	}

}

const adminController = new AdminController();
export default adminController;