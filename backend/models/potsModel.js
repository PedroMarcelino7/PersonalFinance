const db = require('../db');

const getAllPots = (callback) => {
    db.query('select * from pots order by pot_quantity desc', callback);
};

const addNewPot = (values, callback) => {
    db.query(`
        insert into
        pots (pot_name, pot_theme, pot_target)
        values (?, ?, ?) 
    `, [values.pot_name, values.pot_theme, values.pot_target], callback)
}

module.exports = {
    getAllPots,
    addNewPot,
};