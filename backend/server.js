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

app.post('/', (req, res) => {
    const { current, id } = req.body;

    const query = `
        UPDATE BALANCE
        SET BAL_CURRENT = ?
        WHERE ACTIVITY_ID = ?
    `;

    const values = [current, id];

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