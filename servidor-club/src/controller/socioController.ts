import { Request, Response } from 'express';
import socioModel from '../models/socioModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";


class SocioController {

	//SocioPage - Calendar Sector - Inscripcion

    public async clasesLu(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseLu();
		return res.json(usuarios);
	}

    public async clasesMa(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseMa();
		return res.json(usuarios);
	}

    public async clasesMi(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseMi();
		return res.json(usuarios);
	}

    public async clasesJu(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseJu();
		return res.json(usuarios);
	}

    public async clasesVi(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseVi();
		return res.json(usuarios);
	}

    public async clasesSa(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseSa();
		return res.json(usuarios);
	}

    public async clasesDo(req: Request, res: Response) {

		console.log(req.body);
		const usuarios = await socioModel.listarClaseDo();
		return res.json(usuarios);
	}

	//SocioPage - MiPerfil Sector 
	public async miperfil(req: Request, res: Response) {

		const { Numero_Usuario } = req.params;

		const datosusuario = await socioModel.verDatosUser(Numero_Usuario);

		return res.json(datosusuario);
	}

	public async verInfoClase(req: Request, res: Response) {

		const { Id_Clase } = req.params;

		const datosclase = await socioModel.verClase(Id_Clase);

		return res.json(datosclase);
	}

}

const socioController = new SocioController();
export default socioController;