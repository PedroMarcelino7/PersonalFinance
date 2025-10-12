const RecurringBills = require('../models/recurringBillsModel');

const getRecurringBills = (req, res) => {
    RecurringBills.getAllRecurringBills((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar recurring bills' });
        }
        res.json(results);
    });
};

const addRecurringBill = (req, res) => {
    const values = req.body;

    RecurringBills.addRecurringBill(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar recurring bill' });
        }

        res.json(results);
    });
}

const editRecurringBill = (req, res) => {
    const values = req.body;

    RecurringBills.editRecurringBill(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar recurring bill' });
        }

        res.json(results);
    });
}

const deleteRecurringBill = (req, res) => {
    const values = req.body;

    RecurringBills.deleteRecurringBill(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar recurring bill' });
        }

        res.json(results);
    });
}


module.exports = {
    getRecurringBills,
    addRecurringBill,
    editRecurringBill,
    deleteRecurringBill,
};
