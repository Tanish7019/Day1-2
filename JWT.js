const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
