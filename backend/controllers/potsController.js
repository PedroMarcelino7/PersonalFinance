const Pot = require('../models/potsModel');

const getPots = (req, res) => {
    Pot.getAllPots((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar pots' });
        }
        res.json(results);
    });
};

module.exports = {
    getPots,
};
