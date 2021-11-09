import { Request, Response } from 'express';
import socioModel from '../models/socioModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";


class SocioController {

	//SocioPage - Calendar Sector - Inscripcion

	public async clasesTotales(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		console.log(req.body);
		const clases = await socioModel.listarclasesTotales();
		return res.json(clases);
	}

	public async llenarCalendar(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const  { Descripcion_Actividad } = req.params;
		const clases = await socioModel.llenarCalendario(Descripcion_Actividad);
		return res.json(clases);
	}
	
	//SocioPage - MiPerfil Sector 
	public async miperfil(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { Numero_Usuario } = req.params;

		const datosusuario = await socioModel.verDatosUser(Numero_Usuario);

		return res.json(datosusuario);
	}

	public async verInfoClase(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { Id_Clase } = req.params;

		const datosclase = await socioModel.verClase(Id_Clase);

		return res.json(datosclase);
	}

	public async inscripcionSocioClase(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const envioDatos = req.body;

		const busqueda = await socioModel.consultaClases(envioDatos[0], envioDatos[1]);

		if(!busqueda) {

			const cupo = await socioModel.consultarCupo(envioDatos[0]);

			const cantidadInscriptos = await socioModel.cantidadInscriptos(envioDatos[0]);
	
			if ( cantidadInscriptos[0].Cantidad < cupo[0].CUPO_CLASE) {

				const inscripcion = await socioModel.inscribirSocio(envioDatos[0], envioDatos[1]);
				return res.status(200).json({ message: "El usuario fue inscripto a la clase." });

			} else {

				return res.status(403).json({ message: "No hay cupo para esta clase." });
			}

		} else {

			return res.status(403).json({ message: "El usuario ya esta inscripto en esta clase." });
		}

	}

	public async misActividades(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { Numero_Usuario } = req.params;

		console.log(Numero_Usuario);

		const misAct = await socioModel.buscarmisAct(Numero_Usuario);
		return res.json(misAct);
	}

	public async listComent(req: Request, res: Response) {
		//console.log(req.header("Authorization"));
		console.log(req.body);
		const comentario = await socioModel.listarComentario();
		console.log(comentario);
		return res.json(comentario);
	}
	
	public endSession(req: Request, res: Response) {
		console.log(req.body);
		req.session.user = {};
		req.session.auth = false;
		req.session.admin = false;
		req.session.destroy(() => console.log("Session finalizada"));
		res.redirect("/");
	}
}

const socioController = new SocioController();
export default socioController;