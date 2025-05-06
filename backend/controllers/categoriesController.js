const Category = require('../models/categoriesModel');

const getCategories = (req, res) => {
    Category.getCategories((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar categories' });
        }
        res.json(results);
    });
};

const editStatus = (req, res) => {
    const values = req.body;

    Category.editStatus(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar category' });
        }
        res.json(results);
    });
};


module.exports = {
    getCategories,
    editStatus
};
