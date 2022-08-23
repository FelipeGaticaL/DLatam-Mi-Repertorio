//crear base de datos

/* CREATE DATABASE repertorio ;
CREATE TABLE canciones (id SERIAL, titulo VARCHAR(50), artista
VARCHAR(50), tono VARCHAR(10)); */


const express = require('express');
const db = require('./db');
const fs = require("fs");


const app = express();

// middlwares
app.use(express.json()); //datos que vienen de un formularios html
app.use(express.urlencoded({ extended: true })); // urlenconded - 


 

app.get("/", (req, res) => {
            res.sendFile(__dirname + "/index.html");
        })

 /* A) Agregar nueva cancion */       
app.post("/cancion", async (req, res) => {
    try {
    
        const respuesta = await db.agregarCancion(req.body); 
        res.send(respuesta).status(201);
    } catch (error) {
        res.status(500).send(error)
            }
     })


/* Mostrar valores */

app.get("/canciones", async (req, res) => {
    try {
        const canciones = await db.getCanciones();
        res.end(JSON.stringify(canciones))
    } catch (error) {
        res.status(500).send(error)
    }
})

//C) editar canción

app.put("/cancion/:id", async (req, res) => {
       try {
        const editar = Object.assign({},req.params,req.body)
        console.log(editar)
        const result = await db.editCancion(editar)
        res.status(201).json(result)      
        
    } catch (error) {
        res.status(500).send(error)
    } 
})

///* Eliminar datos */
app.delete("/cancion", async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await db.eliminarCancion(id);
        res.send(respuesta);
    } catch (error) {
        res.send(error).status(500);
    }
})
 
app.listen(3000, () => {
    console.log("Server on http://localhost:3000");
});