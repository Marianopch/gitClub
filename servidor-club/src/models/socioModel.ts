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

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad');

		return usuarios[0];
	}

	async listarClaseMa() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

	async listarClaseMi() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

	async listarClaseJu() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

	async listarClaseVi() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

	async listarClaseSa() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

	async listarClaseDo() {

		const usuarios = await this.db.query('SELECT Descripcion_Actividad, Comienzo_Horario, Finalizacion_Horario FROM ');

		return usuarios[0];
	}

}
//Exportamos el enrutador con 

const socioModel = new SocioModel();
export default socioModel;