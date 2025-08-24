const db = require('../db');

const getAllTransactions = (sort, callback) => {
    let orderBy = 'newest'
    const defaultQuery = 'trns.transaction_date desc, trns.transaction_created_at desc;'

    switch (sort) {
        case 'newest':
            orderBy = defaultQuery
            break;
        case 'oldest':
            orderBy = 'trns.transaction_date asc, trns.transaction_created_at asc;'
            break;
        case 'atoz':
            orderBy = `prsn.person_name asc, ${defaultQuery}`
            break;
        case 'ztoa':
            orderBy = `prsn.person_name desc, ${defaultQuery}`
            break;
        case 'highest':
            orderBy = `trns.transaction_amount desc, ${defaultQuery}`
            break;
        case 'lowest':
            orderBy = `trns.transaction_amount asc, ${defaultQuery}`
            break;
    }

    db.query(`
    select
        trns.*, cat.category_name, prsn.person_name, pot.pot_name
    from
        transactions as trns
    join
        categories as cat
    on
        trns.category_id = cat.category_id
    join
        people as prsn
    on
        trns.person_id = prsn.person_id
    left join
        pots as pot
    on
        trns.pot_id = pot.pot_id
    order by
        ${orderBy}
    `, callback);
};

const addTransaction = (values, callback) => {
    db.query(`
        insert into
        transactions (transaction_amount, transaction_type, transaction_date, category_id, person_id)
        values (?, ?, ?, ?, ?)
    `, [values.transaction_amount, values.transaction_type, values.transaction_date, values.category_id, values.person_id], callback);
};

module.exports = {
    getAllTransactions,
    addTransaction
};