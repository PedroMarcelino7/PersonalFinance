const Transaction = require('../models/recurringBillsModel');

const getRecurringBills = (req, res) => {
    Transaction.getAllRecurringBills((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar recurring bills' });
        }
        res.json(results);
    });
};


module.exports = {
    getRecurringBills,
};
