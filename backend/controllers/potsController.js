const Pot = require('../models/potsModel');

const getPots = (req, res) => {
    Pot.getAllPots((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar pots' });
        }
        res.json(results);
    });
};

const addPot = (req, res) => {
    const values = req.body;

    Pot.addNewPot(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar pot' });
        }

        res.json(results);
    });
}

const addMoney = (req, res) => {
    const values = req.body;

    Pot.addMoneyToPot(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error on add money to pot' });
        }

        res.json(results);
    });
}


module.exports = {
    getPots,
    addPot,
    addMoney
};
