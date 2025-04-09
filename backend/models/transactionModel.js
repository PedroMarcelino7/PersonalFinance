const db = require('../db');

const getAllTransactions = (callback) => {
    db.query('SELECT * FROM people', callback);
};

module.exports = {
    getAllTransactions,
};