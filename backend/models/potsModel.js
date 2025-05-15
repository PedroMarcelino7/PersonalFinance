const db = require('../db');

const getAllPots = (callback) => {
    db.query('select * from pots order by pot_date', callback);
};

const addNewPot = (values, callback) => {
    db.query(`
        insert into
        pots (pot_name, pot_theme, pot_target, pot_date, pot_link, pot_quick_button)
        values (?, ?, ?, ?, ?, '[10, 50, 100]') 
    `, [values.pot_name, values.pot_theme, values.pot_target, values.pot_date, values.pot_link], callback)
}

const editPotModel = (values, callback) => {
    db.query(`
        update pots
        set
            pot_name = ?,
            pot_target = ?,
            pot_theme = ?
        where pot_id = ?
    `, [values.pot_name, values.pot_target, values.pot_theme, values.pot_id], callback)
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