const db = require('../db');

const getAllRecurringBills = (callback) => {
    db.query(`
        select
            bills.*, people.person_name, people.person_avatar
        from
            recurring_bills as bills
        join
            people as people
        on
            bills.person_id = people.person_id
    `, callback);
};

module.exports = {
    getAllRecurringBills,
};