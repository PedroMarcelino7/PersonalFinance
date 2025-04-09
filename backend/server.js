const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionController = require('./controllers/transactionController');
const potController = require('./controllers/potsController');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/transactions', transactionController.getTransactions);
app.get('/pots', potController.getPots);

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});