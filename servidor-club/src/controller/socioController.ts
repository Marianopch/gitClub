import { Request, Response } from 'express';
import socioModel from '../models/socioModel';
import flash from "connect-flash";
import jwt from "jsonwebtoken";


class SocioController {

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

}

const socioController = new SocioController();
export default socioController;