const db = require('../db');

const getCategories = (callback) => {
    db.query(`
    select cat.*, theme.theme_color
    from categories as cat
    join themes as theme
    on cat.theme_id = theme.theme_id;    
    `, callback);
};

const editStatus = (values, callback) => {
    db.query(`
        update categories
        set category_isUsed = 1
        where category_id = ?;
    `, [values.category_id], callback);
};

module.exports = {
    getCategories,
    editStatus
};