const express = require('express');
const cors = require('cors');
require('dotenv').config();

const potController = require('./controllers/potsController');
const peopleController = require('./controllers/peopleController')
const transactionsController = require('./controllers/transactionsController')
const recurringBillsController = require('./controllers/recurringBillsController')
const budgetsController = require('./controllers/budgetsController')
const themesController = require('./controllers/themesController')
const overviewController = require('./controllers/overviewController')

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/pots', potController.getPots);
app.post('/pots/post', potController.addPot);
app.post('/pots/edit', potController.editPot);
app.post('/pots/delete', potController.deletePot);
app.post('/pots/finish', potController.finishPot);
app.post('/pots/recover', potController.recoverPot);
app.post('/pots/update-pot-money', potController.updateMoney);
app.post('/pots/update-quick-buttons', potController.updateQuickButtons);

app.get('/people', peopleController.getPeople);
app.post('/people/post', peopleController.addPerson);

app.get('/transactions', transactionsController.getTransactions);
app.post('/transactions/post', transactionsController.addTransaction);

app.get('/recurring-bills', recurringBillsController.getRecurringBills);
app.post('/recurring-bills/post', recurringBillsController.addRecurringBill);
app.post('/recurring-bills/edit', recurringBillsController.editRecurringBill);
app.post('/recurring-bills/delete', recurringBillsController.deleteRecurringBill);
app.post('/recurring-bills/finish', recurringBillsController.finishRecurringBill);

app.get('/budgets', budgetsController.getBudgets)
app.post('/budgets/post', budgetsController.addBudget)
app.post('/budgets/edit', budgetsController.editBudget)
app.post('/budgets/delete', budgetsController.deleteBudget)

app.get('/themes', themesController.getThemes)

app.get('/overview/current-balance', overviewController.getCurrentBalance)
app.get('/overview/available-balance', overviewController.getAvailableBalance)

app.listen(3000, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`);
});