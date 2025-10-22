const db = require('../db');

const getCurrentBalance = (callback) => {
    db.query(`
    SELECT 
        SUM(CASE WHEN transaction_type = 1 THEN transaction_amount ELSE 0 END)
        - SUM(CASE WHEN transaction_type = 0 THEN transaction_amount ELSE 0 END)
    AS current_balance
    FROM transactions;  
    `, callback);
};

const getAvailableBalance = (callback) => {
    db.query(`
    SELECT
    (
        (
        SUM(CASE WHEN transaction_type = 1 THEN transaction_amount ELSE 0 END)
        - SUM(CASE WHEN transaction_type = 0 THEN transaction_amount ELSE 0 END)
        )
        - (SELECT SUM(pot_quantity) FROM pots WHERE POT_STATUS = 0)
        - (SELECT SUM(bill_amount) FROM recurring_bills WHERE NOT bill_status = 1 AND bill_type = 0)
        + (SELECT SUM(bill_amount) FROM recurring_bills WHERE NOT bill_status = 1 AND bill_type = 1)
    ) AS available_balance
    FROM transactions;
    `, callback);
};

module.exports = {
    getCurrentBalance,
    getAvailableBalance
};