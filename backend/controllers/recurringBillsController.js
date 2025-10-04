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
            return res.status(500).json({ error: 'Erro ao recurring bill' });
        }

        res.json(results);
    });
}


module.exports = {
    getRecurringBills,
    addRecurringBill,
};
