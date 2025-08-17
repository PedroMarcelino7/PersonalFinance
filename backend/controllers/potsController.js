const Pot = require('../models/potsModel');

const getPots = (req, res) => {
    const sort = req.query.sort || "oldest"

    Pot.getAllPots(sort, (err, results) => {
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

const editPot = (req, res) => {
    const values = req.body;

    Pot.editPotModel(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar pot' });
        }

        res.json(results);
    });
}

const deletePot = (req, res) => {
    const values = req.body;

    Pot.deletePotModel(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar pot' });
        }

        res.json(results);
    });
}

const updateMoney = (req, res) => {
    const values = req.body;

    Pot.updateMoneyPot(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error on add money to pot' });
        }

        res.json(results);
    });
}

const updateQuickButtons = (req, res) => {
    const values = req.body;

    Pot.updateQuickButtons(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error on edit quick buttons' });
        }

        res.json(results);
    });
}


module.exports = {
    getPots,
    addPot,
    updateMoney,
    editPot,
    deletePot,
    updateQuickButtons
};
