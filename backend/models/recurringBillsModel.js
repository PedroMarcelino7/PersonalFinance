const db = require('../db');

const getAllRecurringBills = (callback) => {
    db.query(`
        select bills.*, prsn.*, bud.budget_name
        from recurring_bills as bills
        join people as prsn
        on bills.person_id = prsn.person_id
        join budgets as bud
        on bills.budget_id = bud.budget_id;
    `, callback);
};

module.exports = {
    getAllRecurringBills,
};