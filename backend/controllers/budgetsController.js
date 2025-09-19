const Budget = require('../models/budgetsModel');

const getBudgets = (req, res) => {
    Budget.getBudgets((err, results) => {
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

const editBudget = (req, res) => {
    const values = req.body;

    Budget.editBudget(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar budget' });
        }

        res.json(results);
    });
}

const deleteBudget = (req, res) => {
    const values = req.body;

    Budget.deleteBudget(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar budget' });
        }

        res.json(results);
    });
}


module.exports = {
    getBudgets,
    addBudget,
    editBudget,
    deleteBudget
};
