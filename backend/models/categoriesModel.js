const db = require('../db');

const getCategories = (callback) => {
    db.query('select * from categories', callback);
};

const editStatus = (values, callback) => {
    db.query(`
        update categories
        set category_isUsed = 1
        where category_id = ?;
    `, [values.category_id], callback);
};

module.exports = {
    getCategories,
    editStatus
};