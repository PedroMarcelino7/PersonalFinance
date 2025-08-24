const db = require('../db');

const getCategories = (callback) => {
    db.query(`
    select cat.*, theme.theme_color
    from categories as cat
    join themes as theme
    on cat.theme_id = theme.theme_id;    
    `, callback);
};

const addCategory = (values, callback) => {
    db.query(`
    insert into
    categories(category_name, category_max, theme_id)
    values(?, ?, ?)
    
    `, [values.category_name, values.category_max, values.theme_id], callback)
}

module.exports = {
    getCategories,
    addCategory
};