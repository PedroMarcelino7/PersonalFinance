const db = require('../db');

const getAllPots = (sort, callback) => {
    let orderBy = 'oldest'

    switch (sort) {
        case 'oldest':
            orderBy = 'pot_created_at asc'
            break
        case 'newest':
            orderBy = 'pot_created_at desc'
            break
        case 'atoz':
            orderBy = 'pot_name asc'
            break
        case 'ztoa':
            orderBy = 'pot_name desc'
            break
        case 'expensive':
            orderBy = 'pot_target desc'
            break
        case 'cheapest':
            orderBy = 'pot_target asc'
            break
    }

    db.query(`
    select
        pots.*, themes.theme_name, themes.theme_color
    from
        pots
    join
        themes
    on 
        pots.theme_id = themes.theme_id
    order by
        ${orderBy}
    `, callback);
};

const addPot = (values, callback) => {
    db.query(`
        insert into
            pots (pot_name, pot_target, pot_date, pot_link, pot_quick_button, theme_id)
        values
            (?, ?, ?, ?, '[10, 50, 100]', ?)
    `,
        [values.pot_name, values.pot_target, values.pot_date, values.pot_link, values.theme_id], callback)
}

const editPot = (values, callback) => {
    db.query(`
        update
            pots
        set
            pot_name = ?,
            pot_target = ?,
            pot_link = ?,
            pot_date = ?,
            theme_id = ?
        where
            pot_id = ?;
    `,
        [values.pot_name, values.pot_target, values.pot_link, values.pot_date, values.theme_id, values.pot_id], callback)
}

const deletePot = (values, callback) => {
    db.query(`
        delete from
            pots
        where
            pot_id = ?;
    `,
        [values.pot_id], callback)
}

const finishPot = (values, callback) => {
    db.beginTransaction((err) => {
        if (err) return callback(err);

        const finishPotQuery = `
            update pots
            set pot_status = 1
            where pot_id = ?
        `;
        const potValues = [values.pot_id];

        db.query(finishPotQuery, potValues, (err, result) => {
            if (err) return db.rollback(() => callback(err));

            const addTransactionQuery = `
                insert into
                    transactions
                    (transaction_amount, transaction_type, budget_id, person_id, pot_id)
                values
                    (?, 0, 1, 1, ?);
            `;
            const transactionValues = [values.transaction_amount, values.pot_id];

            db.query(addTransactionQuery, transactionValues, (err) => {
                if (err) return db.rollback(() => callback(err));

                db.commit((err) => {
                    if (err) return db.rollback(() => callback(err));

                    callback(null, {
                        pot: values.pot_id,
                    });
                });
            });
        });
    });
};

const recoverPot = (values, callback) => {
    db.beginTransaction((err) => {
        if (err) return callback(err);

        const finishPotQuery = `
            update pots
            set pot_status = 0
            where pot_id = ?
        `;
        const potValues = [values.pot_id];

        db.query(finishPotQuery, potValues, (err, result) => {
            if (err) return db.rollback(() => callback(err));

            const addTransactionQuery = `
                insert into
                    transactions
                    (transaction_amount, transaction_type, budget_id, person_id, pot_id)
                values
                    (?, 1, 1, 1, ?);
            `;
            const transactionValues = [values.transaction_amount, values.pot_id];

            db.query(addTransactionQuery, transactionValues, (err) => {
                if (err) return db.rollback(() => callback(err));

                db.commit((err) => {
                    if (err) return db.rollback(() => callback(err));

                    callback(null, {
                        pot: values.pot_id,
                    });
                });
            });
        });
    });
};

const updateMoneyPot = (values, callback) => {
    db.query(`
        update pots
        set pot_quantity = ?
        where pot_id = ?
    `, [values.pot_quantity, values.pot_id], callback)
}

const updateQuickButtons = (values, callback) => {
    db.query(`
        update pots
        set pot_quick_button = ?
        where pot_id = ?
    `, [values.pot_quick_button, values.pot_id], callback)
}

module.exports = {
    getAllPots,
    addPot,
    updateMoneyPot,
    editPot,
    deletePot,
    updateQuickButtons,
    finishPot,
    recoverPot
};