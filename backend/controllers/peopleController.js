const Person = require('../models/peopleModel');

const getPeople = (req, res) => {
    Person.getAllPeople((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar people' });
        }
        res.json(results);
    });
};

const addPerson = (req, res) => {
    const values = req.body;

    Person.addPerson(values, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar pessoa' })
        }

        res.json(results)
    })
}

module.exports = {
    getPeople,
    addPerson
};
