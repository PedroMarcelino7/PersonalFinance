const db = require('../db');

const getCategories = (callback) => {
    db.query('select * from categories', callback);
};

module.exports = {
    getCategories,
};