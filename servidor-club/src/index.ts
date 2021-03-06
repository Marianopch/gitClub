import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import exphbs from "express-handlebars";
import path from "path";
import adminRoutes from "./routes/adminRoutes";
import session from "express-session";
import flash from "connect-flash";
import socioRoutes from './routes/socioRoutes';

declare module 'express-session' {
	export interface SessionData {
		admin: boolean;
	  	user: { [key: string]: any} | any;//en user guardaremos datos de interes
	  	auth: boolean; //indicara si el usuario ha iniciado sesion o no.
		habilitado: boolean;
	}
  }

  
class Server{
	public app:Application;
	constructor(){
		this.app = express();
		
		this.config();
		this.routes();
	}
	config():void{
		//Configuraciones
		this.app.set('port',process.env.PORT || 3000);
        this.app.set('views',path.join(__dirname,'views')); //indicamos que views esta en dist y no en el modulo principal
		this.app.engine('.hbs',exphbs({ //nombre del motor, configuracion
			defaultLayout:'main',
			layoutsDir: path.join(this.app.get('views'),'layouts'),
			partialsDir: path.join(this.app.get('views'),'partials'),
			extname: 'hbs', //definimos la extension de los archivos
			helpers: require('./lib/handlebars') //definimos donde estan los helpers
		}));
		this.app.set('view engine','.hbs'); //ejecutamos el modulo definido

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(cors()); //iniciamos cors
        this.app.use(express.json()); //habilitamos el intercambio de objetos json entre aplicaciones
        this.app.use(express.urlencoded({extended:true}));//habilitamos para recibir datos a traves de formularios html.
		this.app.use(flash());
		this.app.use(express.static(path.join(__dirname, 'public')));


		//configuracion del middeware de sesion
		this.app.use(session({
			secret:'secret_supersecret',//sirve para crear el hash del SSID unico
			resave:false,//evita el guardado de sesion sin modificaciones
			saveUninitialized:false //indica que no se guarde la sesion hasta que se inicialice
		}));

		 //Variables globales
		 this.app.use((req,res,next)=>{
			this.app.locals.error_session=req.flash('error_session');
			this.app.locals.info=req.flash('info');
			this.app.locals.error_user=req.flash('error_user');
			next();
		});
		
		
	}
	routes():void{
        
		this.app.use("/admin",adminRoutes);
		this.app.use("/user",indexRoutes);
		this.app.use("/socio",socioRoutes);
    }

	start():void{
		this.app.listen(this.app.get('port'),() => {
				console.log("Sever escuchando"+this.app.get('port'));
			}
		);
	}
}

const server = new Server();
server.start(); //Ejecutamos el metodo start en inica el server