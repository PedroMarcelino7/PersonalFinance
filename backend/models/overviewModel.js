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
        (COALESCE((SELECT SUM(transaction_amount) FROM transactions WHERE transaction_type = 1), 0))
        - (COALESCE((SELECT SUM(transaction_amount) FROM transactions WHERE transaction_type = 0), 0))
        - (COALESCE((SELECT SUM(pot_quantity) FROM pots WHERE pot_status = 0), 0))
        - (COALESCE((SELECT SUM(bill_amount) FROM recurring_bills WHERE NOT bill_status = 1 AND bill_type = 0), 0))
        + (COALESCE((SELECT SUM(bill_amount) FROM recurring_bills WHERE NOT bill_status = 1 AND bill_type = 1), 0))
    ) AS available_balance;
    `, callback);
};

module.exports = {
    getCurrentBalance,
    getAvailableBalance
};