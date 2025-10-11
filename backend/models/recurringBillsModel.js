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

const addRecurringBill = (values, callback) => {
    db.query(`
        insert into
            recurring_bills
                (bill_name, bill_recurrence, bill_due_date, bill_type, bill_amount, person_id, budget_id)
            values
                (?, ?, ?, ?, ?, ?, ?)
    `,
        [values.bill_name, values.bill_recurrence, values.bill_date, values.bill_type, values.bill_amount, values.person_id, values.budget_id], callback)
}

module.exports = {
    getAllRecurringBills,
    addRecurringBill,
};