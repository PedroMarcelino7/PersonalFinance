const db = require('../db');

const getAllBudgets = (callback) => {
    db.query('select * from budgets order by budget_max desc', callback);
};

const addBudget = (values, callback) => {
    db.query(`
        insert into
        budgets (budget_name, budget_theme, budget_max)
        values (?, ?, ?) 
    `, [values.budget_name, values.budget_theme, values.budget_max], callback)
}

module.exports = {
    getAllBudgets,
    addBudget
};