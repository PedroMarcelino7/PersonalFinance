const db = require('../db');

const getAllTransactions = (callback) => {
    db.query('select * from transactions order by transaction_date desc', callback);
};

module.exports = {
    getAllTransactions,
};