const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});