
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const { infoCars } = require('./carsinventory');

const app = express();
const port = 3000;

// Configura el middleware para analizar los datos enviados en el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura la conexión a tu base de datos de PGAdmin
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '123456',
  port: 5432, // El puerto predeterminado de PGAdmin es   5432
});

// Serve the HTML file
app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, './index.html'));
});





//Ruta para obtener los datos de la base de datos
app.get('/list', (req, res) => {
  const query = 'SELECT * FROM carinventory';
  pool.query(query, (error, result) => {
    if (error) {
      console.error('Error retrieving items:', error);
      res.send('Error retrieving items from database');
    } else {
      const items = result.rows;
      let listItems = '';
      for (const item of items) {
        listItems += `<li>${item.id} MARCA: ${item.marca} MODELO: ${item.modelo} AÑO: ${item.anio} 
        PRECIO:${item.precio} COLOR:${item.color_id}`;
      }
      res.send(`
        <h1>CAR LIST</h1>
        <ul>${listItems}</ul>
      `);
    }
  });
});


// Maneja la solicitud POST del formulario y guarda los datos en la base de datos
app.post('/send', (req, res) => {
  const { marca, modelo, anio, precio, color_id } = req.body;

  // Ejecuta la consulta SQL para insertar los datos en la base de datos
  const query = 'INSERT INTO carinventory (marca, modelo, anio, precio, color_id) VALUES ($1, $2, $3, $4, $5)';
  const values = [marca, modelo, anio, precio, color_id];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error al guardar los datos:', error);
      res.sendStatus(500);
    } else {
      console.log('Datos guardados correctamente');
      res.sendStatus(200);
    }
  });

 
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
