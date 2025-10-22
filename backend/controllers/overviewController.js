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

module.exports = {
    getCurrentBalance
};
