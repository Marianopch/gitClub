import { createPool } from 'mysql2/promise';

class AdminModel {
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

	//MENU SOCIOS
	async listarTodosSocios() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		//const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
		const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Socio"');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}

	async buscarUsuario(Numero_Usuario: string, DNI_Usuario: number) {
		const encontrado: any = await this.db.query('SELECT Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Descripcion_Rol,Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Numero_Usuario= ? OR DNI_Usuario = ?;', [Numero_Usuario, DNI_Usuario]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crear(usuario: object) {
		const result = (await this.db.query('INSERT INTO Usuarios SET ?', [usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}

		//MENU ADMIN
		async listarTodosAdmin() {//Devuelve todas las filas de la tabla usuario
			//const db=this.connection;
			//const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario, Password_Usuario FROM Usuarios');
			const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Administrador"');
			//console.log(usuarios[0]);
			//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
			return usuarios[0];
		}
	
		async buscarAdmin(Numero_Usuario: string, DNI_Usuario: number) {
			const encontrado: any = await this.db.query('SELECT Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Descripcion_Rol,Descripcion_Estado FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Numero_Usuario= ? OR DNI_Usuario = ?;', [Numero_Usuario, DNI_Usuario]);
			//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
			if (encontrado.length > 1)
				return encontrado[0][0];
			return null;
		}
	
		//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
		async crearAdmin(usuario: object) {
			const result = (await this.db.query('INSERT INTO Usuarios SET ?', [usuario]))[0].affectedRows;
			console.log(result);
			return result;
		}

	//Devuelve 1 si logro actualizar el usuario indicado por id
	async actualizar(Numero_Usuario: string, Nombre_Usuario:string, Apellido_Usuario:string, DNI_Usuario:number, Direccion_Usuario:string, Mail_Usuario:string, Telefono_Usuario:number) {
	const result = (await this.db.query('UPDATE Usuarios SET Nombre_Usuario = ? , Apellido_Usuario = ? , DNI_Usuario = ?, Mail_Usuario = ?, Telefono_Usuario = ? , Direccion_Usuario = ?  WHERE Numero_Usuario = ?', [Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario, Numero_Usuario]))[0].affectedRows;
	// async actualizar(Numero_Usuario: string, Nombre_Usuario: string, Apellido_Usuario: string, DNI_Usuario: number, Mail_Usuario: string, Telefono_Usuario: number, Direccion_Usuario: string) {
	// 	console.log(Numero_Usuario);
	// 	const result = (await this.db.query('UPDATE Usuarios SET Nombre_Usuario = ?, Apellido_Usuario = ?, DNI_Usuario = ? ,Mail_Usuario = ?, Telefono_Usuario = ?, Direccion_Usuario = ? WHERE Numero_Usuario = ?', [Numero_Usuario, Nombre_Usuario, Apellido_Usuario, DNI_Usuario, Mail_Usuario, Telefono_Usuario, Direccion_Usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminar(Numero_Usuario: string) {
		const user = (await this.db.query('DELETE FROM Usuarios WHERE Numero_Usuario = ?', [Numero_Usuario]))[0].affectedRows;
		console.log(user);
		return user;
	}

	async buscarId(Numero_Usuario: string) {
		const encontrado: any = await this.db.query('SELECT * FROM Usuarios WHERE Numero_Usuario = ?', [Numero_Usuario]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//MENU ACTIVIDADES
	async listarTodasActividades() {//Devuelve todas las filas de la tabla usuario
		const actividades = await this.db.query('SELECT * FROM Actividades');
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return actividades[0];
	}

	async buscarActividad(Descripcion_Actividad: string) {
		const encontrado: any = await this.db.query('SELECT * FROM Actividades WHERE Descripcion_Actividad = ?', [Descripcion_Actividad]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
	async crearActividad(descripcion: string) {
		const result = (await this.db.query('INSERT INTO Actividades ( Descripcion_Actividad ) VALUES  (?)', [descripcion]))[0].affectedRows;
		console.log(result);
		return result;
	}

	async modificarActividad(Descripcion_Actividad: string, Id_Actividad: number) {
		const result = (await this.db.query('UPDATE Actividades SET Descripcion_Actividad = ? WHERE Id_Actividad = ?', [Id_Actividad, Descripcion_Actividad]))[0].affectedRows;
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el usuario indicado por id
	async eliminarActividad(Id_Actividad: string) {
		const user = (await this.db.query('DELETE FROM Actividades WHERE Id_Actividad = ?', [Id_Actividad]))[0].affectedRows;
		console.log(user);
		return user;
	}

	//MENU INSTRUCTORES

	async listarTodosInstructores() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const usuarios = await this.db.query('SELECT Numero_Usuario, Nombre_Usuario,Apellido_Usuario,DNI_Usuario,Mail_Usuario,Telefono_Usuario,Direccion_Usuario,FechaCreacion_Usuario,Password_Usuario,Roles.Descripcion_Rol,Estados.Descripcion_Estado, Id_Instructor FROM Usuarios JOIN Roles ON Usuarios.Id_Rol = Roles.Id_Rol JOIN Estados ON Usuarios.Id_Estado = Estados.Id_Estado WHERE Roles.Descripcion_Rol = "Instructor"');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return usuarios[0];
	}

	async buscarInstructor(Numero_Usuario: string) {
		const encontrado: any = await this.db.query('SELECT * FROM Usuarios WHERE Numero_Usuario= ?', [Numero_Usuario]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	
	//MENU CLASE
	async listarHorarios() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const horarios = await this.db.query('SELECT * FROM horarios');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return horarios[0];
	}

	async buscarHora(Id_Horario: string) {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const horarios = await this.db.query('SELECT * FROM horarios WHERE Id_Horario = ?', [Id_Horario]);
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		if (horarios.length > 1)
			return horarios[0][0];
		return null;
	}

	async crearClase(Id_Actividad: string, Id_Horario: string, Cupo_Clase: string, Numero_Usuario: string) {

		const result = (await this.db.query('INSERT INTO clases  (Id_Actividad, Id_Horario , Cupo_Clase, Numero_Usuario)   Values  (?, ?, ? ,? )', [Id_Actividad, Id_Horario, Cupo_Clase ,Numero_Usuario]))[0].affectedRows;

		return result;
	}

	async crearClaseDias(Id_Clase: number, dia: any) {
		console.log(Id_Clase);
		const resultDias = (await this.db.query('INSERT INTO diasclases  (Id_Clase, Id_Dias)   Values  (?, ?)', [Id_Clase, dia]))[0].affectedRows;
		console.log(resultDias);
		return resultDias;
	}

	async listarClases() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;
		const clases = await this.db.query('Select * from clases JOIN Actividades ON actividades.Id_Actividad = clases.Id_Actividad JOIN Horarios ON clases.Id_Horario = horarios.Id_Horario JOIN Usuarios ON usuarios.Numero_Usuario = clases.Numero_Usuario;');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return clases[0];
	}

	async buscarClase(Id_Actividad: number, Id_Horario: number, Cupo_Clase: number, Numero_Usuario: number) {
		const clases = await this.db.query('SELECT * FROM clases WHERE Id_Actividad = ? AND Id_Horario = ? AND Cupo_Clase = ? AND Numero_Usuario = ?', [Id_Actividad, Id_Horario, Cupo_Clase ,Numero_Usuario]);

		if (clases.length > 1)
			return clases[0][0];
		return null;
	}

	async listarDias() {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;

		const dias = await this.db.query('SELECT * FROM dias');
		//console.log(usuarios[0]);
		console.log(dias);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return dias[0];
	}

	async consultaIDClase(Id_Actividad: number, Id_Horario: number, Cupo_Clase: number, Numero_Usuario: number) {//Devuelve todas las filas de la tabla usuario
		//const db=this.connection;

		const Id_Clase = await this.db.query('SELECT Id_Clase FROM clases WHERE Id_Actividad = ? AND Id_Horario = ? AND Cupo_Clase = ? AND Numero_Usuario = ?', [Id_Actividad, Id_Horario, Cupo_Clase ,Numero_Usuario]);
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return Id_Clase[0];
	}
}
//Exportamos el enrutador con 

const adminModel = new AdminModel();
export default adminModel;