const db = require('../db');

const getThemes = (callback) => {
    db.query('select * from themes', callback);
};

module.exports = {
    getThemes,
};