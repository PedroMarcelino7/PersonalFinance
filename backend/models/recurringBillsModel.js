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

const editRecurringBill = (values, callback) => {
    db.query(`
        update
            recurring_bills
        set 
            bill_name = ?,
            bill_recurrence = ?,
            bill_due_date = ?,
            bill_type = ?,
            bill_amount = ?,
            person_id = ?,
            budget_id = ?
        where
            bill_id = ?;
    `,
        [values.bill_name, values.bill_recurrence, values.bill_date, values.bill_type, values.bill_amount, values.person_id, values.budget_id, values.bill_id], callback)
}

const deleteRecurringBill = (values, callback) => {
    db.query(`
        delete from
            recurring_bills
        where
            bill_id = ?;
    `,
        [values.bill_id], callback)
}

const finishRecurringBill = (values, callback) => {
    let newDate = new Date(values.bill_date)
    let day = newDate.getDate() + 1
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()

    switch (values.bill_recurrence) {
        case 0:
            day += 7
            break;
        case 1:
            day += 15
            break;
        case 2:
            month++
            break;
        case 3:
            month += 6
            break;
        case 4:
            year++
            break;
        default:
            break;
    }

    newDate = `${year}-${month}-${day}`

    db.beginTransaction((err) => {
        if (err) return callback(err);

        const finishRecurringBillQuery = `
            update recurring_bills
            set
                bill_status = 1,
                bill_due_date = '${newDate}'
            where bill_id = ?;
        `;
        const billValues = [values.bill_id];

        db.query(finishRecurringBillQuery, billValues, (err, result) => {
            if (err) return db.rollback(() => callback(err));

            const addTransactionQuery = `
                insert into
                    transactions
                        (transaction_amount, transaction_type, transaction_date, bill_id, budget_id, person_id)
                    values
                        (?, ?, ?, ?, ?, ?);
            `;
            const transactionValues = [values.bill_amount, values.bill_type, values.bill_date, values.bill_id, values.budget_id, values.person_id];

            db.query(addTransactionQuery, transactionValues, (err) => {
                if (err) return db.rollback(() => callback(err));

                db.commit((err) => {
                    if (err) return db.rollback(() => callback(err));

                    callback(null, {
                        bill: values.bill_id,
                    });
                });
            });
        });
    });
};

module.exports = {
    getAllRecurringBills,
    addRecurringBill,
    editRecurringBill,
    deleteRecurringBill,
    finishRecurringBill
};