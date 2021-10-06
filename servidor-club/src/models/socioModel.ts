import { createPool } from 'mysql2/promise';

class SocioModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.

	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'club',
			connectionLimit: 10
		});
	}

	async listarClaseLu() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "1"');

		return usuarios[0];
	}

	async listarClaseMa() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "2" ');

		return usuarios[0];
	}

	async listarClaseMi() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "3" ');

		return usuarios[0];
	}

	async listarClaseJu() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "4" ');

		return usuarios[0];
	}

	async listarClaseVi() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "5" ');

		return usuarios[0];
	}

	async listarClaseSa() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "6" ');

		return usuarios[0];
	}

	async listarClaseDo() {

		const usuarios = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE diasclases.Id_dias = "7" ');

		return usuarios[0];
	}

	async verClase(Id_Clase: any) {


		const encontrado = await this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE clases.Id_Clase = ?;', [Id_Clase]);

		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}



	
	//SocioPage - MiPerfil Sector 
	async verDatosUser(Numero_Usuario: string) {

		const encontrado = await this.db.query('SELECT * FROM usuarios WHERE Numero_Usuario = ?;', [Numero_Usuario]);

		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async inscribirSocio(Id_Clase: any, Usuario: any) {
		const result = (await this.db.query('INSERT INTO sociosclases SET ?', [Id_Clase, Usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}
	

}
//Exportamos el enrutador con 

const socioModel = new SocioModel();
export default socioModel;