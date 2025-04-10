const db = require('../db');

const getAllPots = (callback) => {
    db.query('select * from pots order by pot_quantity desc', callback);
};

module.exports = {
    getAllPots,
};