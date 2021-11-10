import { Request, Response } from 'express';
import indexModel from '../models/indexModel';
import jwt from "jsonwebtoken";


class IndexController {

    public async login(req: Request, res: Response) {
        const { Numero_Usuario, Password_Usuario } = req.body; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
        const usuario = Numero_Usuario;
        const password = Password_Usuario;
        const result = await indexModel.buscarNombre(usuario);
        // console.log(usuario);
        // console.log(password);
        // console.log(result);

        if (!result){

            return res.status(404).json({ message: "Usuario no registrado" });

        } else {

            if (result?.Numero_Usuario == usuario && result?.Password_Usuario == password) {
                req.session.user = result;
                req.session.auth = true;
    
                if (result?.Id_Rol === 1) {
                    req.session.admin = true;
                    //    return res.redirect("../admin/home")
                } else {
                    req.session.admin = false;
                }
    
                if (result.Id_Estado === 1) {
                    req.session.habilitado = true;
                //res.redirect("./home");
                const token: string = jwt.sign({ _id: result.id }, "secretKey");
    
                console.log(req.session.habilitado);
                return res.status(200).json({ message: "Bienvenido " + result.Numero_Usuario, token: token, rol: result.Id_Rol });
                //res.status(200).json({ message: "Bienvenido " + result.Nombre_Usuario });
                } else {
                    req.session.habilitado = false;
                    return res.status(403).json({ message: "Usuario No habilitado por falta de pago. Contactarse con Administracion" });
                }
            }

            return res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
            //res.send({ "Usuario y/o contraseña incorrectos": req.body });
            //req.flash("error_session", "Usuario y/o Password Incorrectos");
            //res.redirect("./error");
        }


        // console.log(result.Numero_Usuario);
        // console.log(result.Password_Usuario);

        
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
        req.session.habilitado = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }

}

const indexController = new IndexController();
export default indexController;