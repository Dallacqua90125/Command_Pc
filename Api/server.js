const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o SQLite
const db = new sqlite3.Database('./comandas.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Criar tabela
db.run(`CREATE TABLE IF NOT EXISTS comandas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  descricao TEXT,
  valor REAL
)`);

// Rota para criar comandas
app.post('/comandas', (req, res) => {
  const { descricao, valor } = req.body;
  const query = 'INSERT INTO comandas (descricao, valor) VALUES (?, ?)';
  db.run(query, [descricao, valor], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ id: this.lastID, descricao, valor });
  });
});

// Rota para listar comandas
app.get('/comandas', (req, res) => {
  const query = 'SELECT * FROM comandas';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}/comandas`);
});
