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
        res.status(200).json(result.rows); 
    } catch (err) {
        console.error('Error fetching menus:', err.stack);
        res.status(500).send('Terjadi kesalahan di server: ' + err.message);
    }
});

app.get('/menu/:id', async (req, res) => {
    const menuId = req.params.id;
    try {
        const result = await db.query('SELECT * FROM tb_dimsum WHERE id = $1', [menuId]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Menu tidak ditemukan.' });
        }
    } catch (err) {
        console.error('Error fetching menu:', err.stack);
        res.status(500).send('Terjadi kesalahan di server: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
