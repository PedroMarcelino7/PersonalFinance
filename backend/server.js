const express = require('express');
const cors = require('cors');
require('dotenv').config();

const potController = require('./controllers/potsController');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/pots', potController.getPots);

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});