const db = require('../db');

const getThemes = (callback) => {
    db.query('select * from themes where theme_isUsed = 0', callback);
};

module.exports = {
    getThemes,
};