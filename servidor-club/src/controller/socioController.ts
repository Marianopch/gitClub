import { Request, Response } from 'express';
import socioModel from '../models/socioModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";
import { convertToObject } from 'typescript';


class SocioController {

	//SocioPage - Calendar Sector - Inscripcion

	public async clasesTotales(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const clases = await socioModel.listarclasesTotales();
		return res.json(clases);
	}

	public async llenarCalendar(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { Descripcion_Actividad } = req.params;
		const clases = await socioModel.llenarCalendario(Descripcion_Actividad);
		return res.json(clases);
	}

	//SocioPage - MiPerfil Sector 
	public async miperfil(req: Request, res: Response) {

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


		const envioDatos = req.body;

		const busqueda = await socioModel.consultaClases(envioDatos[0], envioDatos[1]);

		if (!busqueda) {

			const cupo = await socioModel.consultarCupo(envioDatos[0]);

			const cantidadInscriptos = await socioModel.cantidadInscriptos(envioDatos[0]);

			if (cantidadInscriptos[0].Cantidad < cupo[0].CUPO_CLASE) {

				//traigo horario y dia de la clase a anotarse
				const horarioClaseAnotar = await socioModel.consultaHorario(envioDatos[0]);

				//traigo horario y dia de la clases inscriptas
				const horarioClasesInscriptas = await socioModel.consultaHorario2(envioDatos[1], envioDatos[2]);

				//hago un array con los dias 
				const arrayDias1 = horarioClaseAnotar.Dias.split(',');


				//hago un array con los dias 
				if (horarioClasesInscriptas == null || horarioClasesInscriptas == undefined) {
					const inscripcion = await socioModel.inscribirSocio(envioDatos[0], envioDatos[1]);

					return res.json({ message: "El usuario fue inscripto a la clase." });

				} else {

					const arrayDias2 = horarioClasesInscriptas.Dias.split(',');

					let resultado = findCommonElement(arrayDias1, arrayDias2);

					if (resultado == true) {
						return res.status(403).json({ message: 'No puedes inscribirte a las clases, hay una clase con este horario en la cual esta inscripto.' });
						
					} else {

						const inscripcion = await socioModel.inscribirSocio(envioDatos[0], envioDatos[1]);

						return res.json({ message: "El usuario fue inscripto a la clase." });
					}
				}

			} else {

				return res.status(403).json({ message: "No hay cupo para esta clase." });
			}


		} else {

			return res.status(403).json({ message: "El usuario ya esta inscripto en esta clase." });
		}

		function findCommonElement(array1: string | any[], array2: string | any[]) {

			for (let i = 0; i < array1.length; i++) {

				for (let j = 0; j < array2.length; j++) {

					if (array1[i] === array2[j]) {

						return true;
					}
				}
			}
			return false;
		}
	}

	public async misActividades(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { Numero_Usuario } = req.params;

		const misAct = await socioModel.buscarmisAct(Numero_Usuario);
		return res.json(misAct);
	}

	public async eliminarClase(req: Request, res: Response) {
		console.log(req.header("Authorization"));

		const { id } = req.params;
		const { Numero_Usuario } = req.params;

		console.log("Id", id, "Numero", Numero_Usuario);

		const eliminar = await socioModel.eliminarClase(id, Numero_Usuario);

		return res.status(200).json({ message: 'Clase ELIMINADA!' });
	}

	public async listComent(req: Request, res: Response) {
		//console.log(req.header("Authorization"));
		console.log(req.body);
		const comentario = await socioModel.listarComentario();

		return res.json(comentario);
	}

	public async listarUltimosComentarios(req: Request, res: Response) {
		//console.log(req.header("Authorization"));

		const comentario = await socioModel.listarUltimoComentario();

		return res.json(comentario);
	}

	public endSession(req: Request, res: Response) {

		req.session.user = {};
		req.session.auth = false;
		req.session.admin = false;
		req.session.destroy(() => console.log("Session finalizada"));
		res.redirect("/");
	}
}

const socioController = new SocioController();
export default socioController;