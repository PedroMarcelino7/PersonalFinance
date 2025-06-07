const db = require('../db');

const getAllTransactions = (callback) => {
    db.query('select * from transactions order by transaction_date desc', callback);
};

const addTransaction = (values, callback) => {
    db.query(`
        insert into
        transactions (transaction_amount, transaction_type, transaction_date, category_id, person_id)
        values (?, ?, ?, ?, ?)
    `, [values.transaction_amount, values.transaction_type, values.transaction_date, values.category_id, values.person_id], callback);
};

module.exports = {
    getAllTransactions,
    addTransaction
};