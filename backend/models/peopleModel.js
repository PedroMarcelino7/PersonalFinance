const db = require('../db');

const getAllPeople = (callback) => {
    db.query('select * from people', callback);
};

module.exports = {
    getAllPeople,
};