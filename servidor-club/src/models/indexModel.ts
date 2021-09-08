import { createPool } from 'mysql2/promise';

class IndexModel {
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

//Devuelve un objeto cuya fila en la tabla usuarios coincide con nombre.
    //Si no la encuentra devuelve null
    async buscarNombre(nombre: string) {
        const encontrado: any = await this.db.query('SELECT * FROM usuarios WHERE Nombre_Usuario = ?', [nombre]);
        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
        if (encontrado.length > 1)
            return encontrado[0][0];
        return null;
    }

}

//Exportamos el enrutador con 

const indexModel = new IndexModel();
export default indexModel;