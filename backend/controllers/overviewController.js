const Overview = require('../models/overviewModel');

const getCurrentBalance = (req, res) => {
    Overview.getCurrentBalance((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar dados da overview' });
        }

        const currentBalance = results[0]?.current_balance || 0;

        res.json({ current_balance: currentBalance });
    });
};

const getAvailableBalance = (req, res) => {
    Overview.getAvailableBalance((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar dados da overview' });
        }

        const availableBalance = results[0]?.available_balance || 0;

        res.json({ available_balance: availableBalance });
    });
};

const getMonthExpenses = (req, res) => {
    Overview.getMonthExpenses((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar dados da overview' });
        }

        const monthExpenses = results[0]?.month_expenses || 0;

        res.json({ month_expenses: monthExpenses });
    });
};

module.exports = {
    getCurrentBalance,
    getAvailableBalance,
    getMonthExpenses
};
