const db = require('../db');

const getAllBudgets = (callback) => {
    db.query('select * from budgets order by budget_max desc', callback);
};

module.exports = {
    getAllBudgets,
};