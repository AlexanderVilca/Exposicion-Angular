const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_dawa'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conectado a la base de datos MySQL');
});

// Rutas para publicaciones
app.get('/publicaciones', (req, res) => {
  connection.query('SELECT * FROM publicaciones', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/publicaciones/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM publicaciones WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});

app.post('/publicaciones', (req, res) => {
  const publicacion = req.body;
  connection.query('INSERT INTO publicaciones SET ?', publicacion, (error, result) => {
    if (error) throw error;
    res.status(201).json(result.insertId);
  });
});

app.put('/publicaciones/:id', (req, res) => {
  const { id } = req.params;
  const publicacion = req.body;
  connection.query('UPDATE publicaciones SET ? WHERE id = ?', [publicacion, id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

app.delete('/publicaciones/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM publicaciones WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

// Rutas para usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.json(result[0]);
  });
});

app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  connection.query('INSERT INTO usuarios SET ?', usuario, (error, result) => {
    if (error) throw error;
    res.status(201).json(result.insertId);
  });
});

app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = req.body;
  connection.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.status(200).json({ id });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
