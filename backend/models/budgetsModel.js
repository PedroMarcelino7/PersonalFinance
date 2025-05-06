const db = require('../db');

const getAllBudgets = (callback) => {
    db.query('select * from budgets order by budget_max desc', callback);
};

const addBudget = (values, callback) => {
    db.query(`
        insert into
        budgets (category_id, budget_theme, budget_max)
        values (?, ?, ?) 
    `, [values.category_id, values.budget_theme, values.budget_max], callback)
}

module.exports = {
    getAllBudgets,
    addBudget
};