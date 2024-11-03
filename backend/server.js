import express from 'express';
import cors from 'cors';
import { connection } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const dbHost = process.env.DB_HOST;
const corsOrigin = process.env.CORS_ORIGIN;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;

    const query = `
        INSERT INTO
        USERS (USER_NAME, USER_EMAIL, USER_PASSWORD)
        VALUES (?, ?, ?)
    `;

    const values = [name, email, password];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error on user register:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

app.get('/get/balance', (req, res) => {
    const query = `
        SELECT * FROM BALANCE
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching balance:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/get/budgets', (req, res) => {
    const query = `
        SELECT * FROM BUDGETS
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching budgets:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/get/pots', (req, res) => {
    const query = `
        SELECT * FROM POTS
        WHERE POT_STATUS = 1
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching pots:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/get/transactions', (req, res) => {
    const { limit, offset } = req.query;

    const query = `
        SELECT * FROM TRANSACTIONS
        ORDER BY TRA_DATE
        LIMIT ? OFFSET ?;
    `;

    const values = [parseInt(limit), parseInt(offset)];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error fetching transactions:", err);
            return res.status(500).send(err);
        }

        res.json(results);
    });
});

app.get('/get/transactions/quantity', (req, res) => {
    const query = `
        SELECT COUNT(*) AS QUANTITY FROM TRANSACTIONS
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching transactions quantity:", err);
            return res.status(500).send(err);
        }

        res.json({ quantity: results[0].QUANTITY });
    });
});

app.post('/post/pots', (req, res) => {
    const { name, target, theme } = req.body;

    const query = `
        INSERT INTO
        POTS (POT_NAME, POT_TARGET, POT_THEME)
        VALUES (?, ?, ?)
    `;

    const values = [name, target, theme];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error updating balance:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

app.post('/delete/pots', (req, res) => {
    const { id } = req.body;

    const query = `
        UPDATE POTS
        SET POT_STATUS = 0
        WHERE POT_ID = ?;
    `;

    const values = [id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error deleting pot:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

app.post('/update/pots', (req, res) => {
    const { id, name, target, theme } = req.body;

    const query = `
        UPDATE POTS
        SET POT_NAME = ?, POT_TARGET = ?, POT_THEME = ?
        WHERE POT_ID = ?;
    `;

    const values = [name, target, theme, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error updating pot:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

app.post('/withdraw/pots', (req, res) => {
    const { id, total } = req.body;

    const query = `
        UPDATE POTS
        SET POT_TOTAL = ?
        WHERE POT_ID = ?;
    `;

    const values = [total, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error updating pot:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

app.post('/add/pots', (req, res) => {
    const { id, total } = req.body;

    const query = `
        UPDATE POTS
        SET POT_TOTAL = ?
        WHERE POT_ID = ?;
    `;

    const values = [total, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error updating pot:", err);
            return res.status(500).send(err);
        }

        res.status(201).json(results);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
