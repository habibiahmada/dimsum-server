const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM tb_dimsum');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching menus:', err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/menu/:id', async (req, res) => {
    const menuId = req.params.id;
    try {
        const result = await db.query('SELECT * FROM tb_dimsum WHERE id = $1', [menuId]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Menu not found' });
        }
    } catch (err) {
        console.error('Error fetching menu:', err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
