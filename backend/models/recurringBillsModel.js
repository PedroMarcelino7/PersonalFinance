const db = require('../db');

const getAllRecurringBills = (callback) => {
    db.query('select * from recurring_bills', callback);
};

module.exports = {
    getAllRecurringBills,
};