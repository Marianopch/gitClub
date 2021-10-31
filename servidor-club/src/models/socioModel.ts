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

	async listarclasesTotales() {

		const clases = await this.db.query('SELECT clases.Id_Clase, Descripcion_Actividad, Comienzo_Horario,  Finalizacion_Horario, diasclases.Id_Dias FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad ');

		return clases[0];
	}
	

	
	async llenarCalendario(Descripcion_Actividad: any) {

		const clases = await this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad WHERE actividades.Descripcion_Actividad = ?;', [Descripcion_Actividad]);

		return clases[0];
	}

	async verClase(Id_Clase: any) {


		const encontrado = await this.db.query('SELECT * FROM clases JOIN diasclases ON clases.id_clase = diasclases.id_clase JOIN dias ON diasclases.Id_dias = dias.Id_dias JOIN horarios ON clases.Id_Horario = horarios.Id_Horario JOIN actividades ON actividades.Id_Actividad = clases.Id_Actividad JOIN usuarios ON usuarios.Numero_Usuario = clases.Numero_Usuario WHERE clases.Id_Clase = ?;', [Id_Clase]);

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

	async inscribirSocio(Id_Clase:string, Numero_Usuario:string) {
		console.log(Id_Clase, Numero_Usuario)
		const result = (await this.db.query('INSERT INTO sociosclases ( Id_Clase, Numero_Usuario ) VALUES  (?, ?)', [Id_Clase,Numero_Usuario]))[0].affectedRows;
		
		console.log(result);
		return result;
	}
	
	async buscarmisAct(Numero_Usuario: string) {

		const encontrado = await this.db.query('SELECT * FROM Usuarios U JOIN sociosclases SC ON U.Numero_Usuario = SC.Numero_Usuario JOIN clases C ON SC.Id_Clase = C.Id_Clase JOIN diasclases DC ON C.id_clase = DC.id_clase JOIN dias D ON DC.Id_dias = D.Id_dias JOIN horarios H ON C.Id_Horario = H.Id_Horario JOIN actividades A ON A.Id_Actividad = C.Id_Actividad WHERE U.Numero_Usuario = ?;', [Numero_Usuario]);
		console.log('BD:' ,encontrado)
		if (encontrado.length > 1)
			return encontrado[0];
		return null;
	}

	async listarComentario() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const comentario = await this.db.query('SELECT Id_Comentario, Titulo_Comentario, Descripcion_Comentario, Numero_Usuario, DATE_FORMAT(fcreacion, "%d/%m/%Y %H:%i") AS fcreacion FROM comentario order by fcreacion desc;');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return comentario[0];
	}

}
//Exportamos el enrutador con 

const socioModel = new SocioModel();
export default socioModel;