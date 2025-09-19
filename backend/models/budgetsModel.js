const db = require('../db');

const getBudgets = (callback) => {
    db.query(`
    select bud.*, theme.theme_color
    from budgets as bud
    join themes as theme
    on bud.theme_id = theme.theme_id;    
    `, callback);
};

const addBudget = (values, callback) => {
    db.query(`
    insert into
    budgets(budget_name, budget_max, theme_id)
    values(?, ?, ?)
    
    `, [values.budget_name, values.budget_max, values.theme_id], callback)
}

const editBudget = (values, callback) => {
    db.query(`
    update
        budgets
    set
        budget_name = ?,
        budget_max = ?,
        theme_id = ?
    where
        budget_id = ?;
    
    `, [values.budget_name, values.budget_max, values.theme_id, values.budget_id], callback)
}

const deleteBudget = (values, callback) => {
    db.query(`
    delete from
        budgets
    where
        budget_id = ?;
    
    `, [values.budget_id], callback)
}

module.exports = {
    getBudgets,
    addBudget,
    editBudget,
    deleteBudget
};