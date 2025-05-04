const Person = require('../models/categoriesModel');

const getCategories = (req, res) => {
    Person.getCategories((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar categories' });
        }
        res.json(results);
    });
};


module.exports = {
    getCategories,
};
