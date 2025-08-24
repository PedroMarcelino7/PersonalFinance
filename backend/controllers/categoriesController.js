const Category = require('../models/categoriesModel');

const getCategories = (req, res) => {
    Category.getCategories((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar categories' });
        }
        res.json(results);
    });
};

const addCategory = (req, res) => {
    const values = req.body;

    Category.addCategory(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar category' });
        }

        res.json(results);
    });
}

const editCategory = (req, res) => {
    const values = req.body;

    Category.editCategory(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao editar category' });
        }

        res.json(results);
    });
}

const deleteCategory = (req, res) => {
    const values = req.body;

    Category.deleteCategory(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar category' });
        }

        res.json(results);
    });
}


module.exports = {
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
};
