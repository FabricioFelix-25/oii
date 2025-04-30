// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Habilita CORS para o frontend poder acessar
app.use(cors());
app.use(express.json());

// Rota simples de teste
app.get('/', (req, res) => {
  res.send('Servidor Express rodando na porta ' + port);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
