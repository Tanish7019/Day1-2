const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example route to test the server
app.get('/', (req, res) => {
    res.send('E-commerce backend is running!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
