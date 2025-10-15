const db = require('../db');

const getAllTransactions = (sort, search, callback) => {
    let orderBy = 'trns.transaction_date desc, trns.transaction_created_at desc';

    switch (sort) {
        case 'oldest':
            orderBy = 'trns.transaction_date asc, trns.transaction_created_at asc';
            break;
        case 'atoz':
            orderBy = `prsn.person_name asc, ${orderBy}`;
            break;
        case 'ztoa':
            orderBy = `prsn.person_name desc, ${orderBy}`;
            break;
        case 'highest':
            orderBy = `trns.transaction_amount desc, ${orderBy}`;
            break;
        case 'lowest':
            orderBy = `trns.transaction_amount asc, ${orderBy}`;
            break;
    }

    let whereClause = '';
    const params = [];

    if (search && search.trim() !== '') {
        whereClause = `
            WHERE 
                LOWER(prsn.person_name) LIKE LOWER(?) 
                OR LOWER(bud.budget_name) LIKE LOWER(?) 
                OR trns.transaction_date LIKE ?
                OR trns.transaction_amount LIKE ?
        `;
        const like = `%${search}%`;
        params.push(like, like, like, like);
    }

    db.query(`
        SELECT
            trns.*, bill.bill_name, bud.budget_name, prsn.person_name, pot.pot_name
        FROM
            transactions AS trns
        JOIN
            budgets AS bud ON trns.budget_id = bud.budget_id
        JOIN
            people AS prsn ON trns.person_id = prsn.person_id
        LEFT JOIN
            pots AS pot ON trns.pot_id = pot.pot_id
        LEFT JOIN
            recurring_bills AS bill ON trns.bill_id = bill.bill_id
        ${whereClause}
        ORDER BY
            ${orderBy};
    `, params, callback);
};

const addTransaction = (values, callback) => {
    db.query(`
        insert into
        transactions (transaction_amount, transaction_type, transaction_date, budget_id, person_id)
        values (?, ?, ?, ?, ?)
    `, [values.transaction_amount, values.transaction_type, values.transaction_date, values.budget_id, values.person_id], callback);
};

module.exports = {
    getAllTransactions,
    addTransaction
};