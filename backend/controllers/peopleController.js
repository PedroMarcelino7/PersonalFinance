const Person = require('../models/peopleModel');

const getPeople = (req, res) => {
    Person.getAllPeople((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar people' });
        }
        res.json(results);
    });
};


module.exports = {
    getPeople,
};
