const express = require('express');
const cors = require('cors');
require('dotenv').config();

const potController = require('./controllers/potsController');
const budgetController = require('./controllers/budgetsController')
const peopleController = require('./controllers/peopleController')
const transactionsController = require('./controllers/transactionsController')
const recurringBillsController = require('./controllers/recurringBillsController')
const categoriesController = require('./controllers/categoriesController')

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/pots', potController.getPots);
app.post('/pots/post', potController.addPot);
app.post('/pots/edit', potController.editPot);
app.post('/pots/delete', potController.deletePot);
app.post('/pots/update-pot-money', potController.updateMoney);

app.get('/budgets', budgetController.getBudgets);
app.post('/budgets/post', budgetController.addBudget);

app.get('/people', peopleController.getPeople);

app.get('/transactions', transactionsController.getTransactions);

app.get('/recurring-bills', recurringBillsController.getRecurringBills);

app.get('/categories', categoriesController.getCategories)

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});