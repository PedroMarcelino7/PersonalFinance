const Theme = require('../models/themesModel');

const getThemes = (req, res) => {
    Theme.getThemes((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar themes' });
        }
        res.json(results);
    });
};


module.exports = {
    getThemes,
};
