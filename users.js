const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
    const { username, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, hashedPassword, address]
        );
        res.json(newUser.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(400).send('User not found');

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, 'jwtsecret');
        res.json({ token });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// View user profile
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update user profile
router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, address } = req.body;
    try {
        const updatedUser = await pool.query(
            'UPDATE users SET username = $1, email = $2, address = $3 WHERE id = $4 RETURNING *',
            [username, email, address, id]
        );
        res.json(updatedUser.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
