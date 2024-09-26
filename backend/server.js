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
    const query = `
        SELECT * FROM TRANSACTIONS
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching transactions:", err);
            return res.status(500).send(err);
        }

        res.json(results);
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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
