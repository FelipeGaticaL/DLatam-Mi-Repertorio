
const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "repertorio",
    port: 5432
})

/* A) Agregar nueva cancion */ 

const agregarCancion = async ({ titulo, artista, tono }) => {

    const SQLQuery = {
        text: `INSERT INTO canciones (titulo, artista, tono) values ($1, $2, $3) RETURNING *;`,
        values: [titulo, artista, tono]
    };
    const result = await pool.query(SQLQuery);

    return result.rows[0];
    
}

/* Mostrar valores */

const getCanciones = async () => {
    const { rows } = await pool.query("SELECT * FROM canciones")
    return rows
}

/* Editando canción */
const editCancion = async ({titulo, artista, tono, id} ) => {
    
    const consulta = {
        text: "UPDATE canciones SET titulo = $1, artista = $2, tono =$3 WHERE id = $4 RETURNING *",
        values: [titulo, artista, tono, id]
    }
    const { rows } = await pool.query(consulta)
    return rows
}

const eliminarCancion = async (id) => {
    const SQLQuery = {
        text: `DELETE FROM canciones WHERE id=$1`,
        values: [id]
    };
    const result = await pool.query(SQLQuery);

    const { rowCount } = result;
    if (rowCount === 0) throw 'No existe ningún registro con este ID';

    return 'Canción eliminada con exito';
    
  
}


module.exports = {agregarCancion, getCanciones,editCancion,eliminarCancion}