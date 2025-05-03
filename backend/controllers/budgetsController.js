const Budget = require('../models/budgetsModel');

const getBudgets = (req, res) => {
    Budget.getAllBudgets((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar budgets' });
        }
        res.json(results);
    });
};

const addBudget = (req, res) => {
    const values = req.body;

    Budget.addBudget(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar budget' });
        }

        res.json(results);
    });
}


module.exports = {
    getBudgets,
    addBudget
};
