const db = require('../db');

const getAllPots = (callback) => {
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
        pot_date    
    `, callback);
};

const addNewPot = (values, callback) => {
    db.beginTransaction((err) => {
        if (err) return callback(err);

        const insertPotQuery = `
            INSERT INTO pots (pot_name, pot_target, pot_date, pot_link, pot_quick_button, theme_id)
            VALUES (?, ?, ?, ?, '[10, 50, 100]', ?)
        `;

        const potValues = [
            values.pot_name,
            values.pot_target,
            values.pot_date,
            values.pot_link,
            values.theme_id,
        ];

        db.query(insertPotQuery, potValues, (err, result) => {
            if (err) return db.rollback(() => callback(err));

            const updateThemeQuery = `
                UPDATE themes SET theme_isUsed = 1 WHERE theme_id = ?
            `;

            db.query(updateThemeQuery, [values.theme_id], (err) => {
                if (err) return db.rollback(() => callback(err));

                db.commit((err) => {
                    if (err) return db.rollback(() => callback(err));

                    callback(null, { pot: result.insertId, updatedTheme: values.theme_id });
                });
            });
        });
    });
}

const editPotModel = (values, callback) => {
    db.beginTransaction((err) => {
        if (err) return callback(err);

        const editPotQuery = `
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
        `

        const potValues = [
            values.pot_name,
            values.pot_target,
            values.pot_link,
            values.pot_date,
            values.theme_id,
            values.pot_id
        ]

        db.query(editPotQuery, potValues, (err, result) => {
            if (err) return db.rollback(() => callback(err));

            const updateNewTheme = `
            update
                themes
            set
                theme_isUsed = 1
            where
                theme_id = ?
        `;
        
            db.query(updateNewTheme, [values.theme_id], (err) => {
                if (err) return db.rollback(() => callback(err));

                const updateOldTheme = `
                update
                    themes
                set
                    theme_isUsed = 0
                where
                    theme_id = ?
            `;

                db.query(updateOldTheme, [values.oldTheme], (err) => {
                    if (err) return db.rollback(() => callback(err));

                    db.commit((err) => {
                        if (err) return db.rollback(() => callback(err));

                        callback(null, { updatedPot: values.pot_id, updatedTheme: values.theme_id });
                    });
                });
            });
        });
    });

    // db.query(`
    //     update
    //         pots
    //     set
    //         pot_name = ?,
    //         pot_target = ?,
    //         pot_link = ?,
    //         pot_date = ?,
    //         theme_id = ?
    //     where
    //         pot_id = ?;
    // `, [values.pot_name, values.pot_target, values.pot_link, values.pot_date, values.theme_id, values.pot_id], callback)
}

const deletePotModel = (values, callback) => {
    db.query(`
        delete from pots
        where pot_id = ?
    `, [values.pot_id], callback)
}

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
    addNewPot,
    updateMoneyPot,
    editPotModel,
    deletePotModel,
    updateQuickButtons
};