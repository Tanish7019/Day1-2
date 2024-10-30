const express = require('express');
const pool = require('../db');
const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// GET single product
router.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        res.json(product.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new product (Admin only)
router.post('/products', async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, stock]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a product (Admin only)
router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    try {
        const updatedProduct = await pool.query(
            'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
            [name, description, price, stock, id]
        );
        res.json(updatedProduct.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a product (Admin only)
router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
