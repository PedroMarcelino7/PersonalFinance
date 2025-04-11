const Transaction = require('../models/transactionsModel');

const getTransactions = (req, res) => {
    Transaction.getAllTransactions((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar transactions' });
        }
        res.json(results);
    });
};


module.exports = {
    getTransactions,
};
