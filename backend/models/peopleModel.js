const db = require('../db');

const getAllPeople = (callback) => {
    db.query('select * from people', callback);
};

const addPerson = (values, callback) => {
    db.query(`
        INSERT INTO
            people (person_name, person_avatar)
        VALUES
            (?, '');
    `,
        [values.person_name], callback)
}

module.exports = {
    getAllPeople,
    addPerson
};