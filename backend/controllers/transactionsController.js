const Transaction = require('../models/transactionsModel');

const getTransactions = (req, res) => {
    const sort = req.query.sort || "oldest"
    const search = req.query.search || ""

    Transaction.getAllTransactions(sort, search, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar transactions' });
        }
        res.json(results);
    });
};

const addTransaction = (req, res) => {
    const values = req.body;

    Transaction.addTransaction(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar transactions' });
        }
        res.json(results);
    })
}

const getTransactionsByActualMonth = (req, res) => {
    Transaction.getTransactionsByActualMonth((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar transactions' });
        }
        res.json(results);
    })
}

module.exports = {
    getTransactions,
    addTransaction,
    getTransactionsByActualMonth
};
