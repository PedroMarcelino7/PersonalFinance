const db = require('../db');

const getAllPots = (callback) => {
    db.query('select * from pots', callback);
};

module.exports = {
    getAllPots,
};