// server.js (updated)
// Express + MySQL backend aligned with Edit.js expectations:
//  - PUT /updatecard    body: { id, card_name, card_pic }
//  - DELETE /deletecard/:id
// Also keeps existing routes: GET /allcards, POST /addcard

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// --- Config ---
const PORT = process.env.PORT || 3000;
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // optional; we will safely qualify table name if present
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Optional: allow overriding table name via env (defaults to 'cards')
const CARDS_TABLE = process.env.CARDS_TABLE || 'cards';

// Build a safely-qualified table name like `dbname`.`cards` if DB_NAME is alphanumeric/underscore
function fqtn() {
  const db = process.env.DB_NAME;
  const safeDb = db && /^\w+$/.test(db) ? `\`${db}\`.` : '';
  const safeTable = /^\w+$/.test(CARDS_TABLE) ? `\`${CARDS_TABLE}\`` : '`cards`';
  return `${safeDb}${safeTable}`;
}

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// --- App setup ---
const app = express();
app.use(cors()); // If your React Native app calls a different host, CORS isn’t required—but harmless here.
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// ---------------- Existing routes ----------------
// Get all cards
app.get('/allcards', async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM ${fqtn()}`);
    res.json(rows);
  } catch (err) {
    console.error('[allcards] error:', err);
    res.status(500).json({ message: 'Server error for allcards' });
  }
});

// Create a new card
app.post('/addcard', async (req, res) => {
  const { card_name, card_pic } = req.body || {};
  if (!card_name || !card_pic) {
    return res.status(400).json({ message: 'card_name and card_pic are required' });
  }
  try {
    const sql = `INSERT INTO ${fqtn()} (card_name, card_pic) VALUES (?, ?)`;
    const [result] = await pool.execute(sql, [card_name, card_pic]);
    res.status(201).json({ id: result.insertId, card_name, card_pic, message: `Card ${card_name} added successfully` });
  } catch (err) {
    console.error('[addcard] error:', err);
    res.status(500).json({ message: `Server error - could not add card ${card_name}` });
  }
});

// ---------------- New routes for Edit.js ----------------
// Update an existing card (expects { id, card_name, card_pic })
app.put('/updatecard', async (req, res) => {
  const { id, card_name, card_pic } = req.body || {};
  if (!id) return res.status(400).json({ message: 'id is required' });
  if (!card_name || !card_pic) return res.status(400).json({ message: 'card_name and card_pic are required' });

  try {
    const sql = `UPDATE ${fqtn()} SET card_name = ?, card_pic = ? WHERE id = ?`;
    const [result] = await pool.execute(sql, [card_name, card_pic, id]);

    // result.affectedRows indicates if a row was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No card found with id ${id}` });
    }

    // Optionally return the updated row (if desired)
    // const [rows] = await pool.execute(`SELECT * FROM ${fqtn()} WHERE id = ?`, [id]);
    // return res.json({ message: 'Card updated', item: rows[0] });

    return res.json({ message: 'Card updated', id, card_name, card_pic });
  } catch (err) {
    console.error('[updatecard] error:', err);
    return res.status(500).json({ message: 'Server error - could not update card' });
  }
});

// Delete a card by id (id in URL path)
app.delete('/deletecard/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'id is required' });
  try {
    const sql = `DELETE FROM ${fqtn()} WHERE id = ?`;
    const [result] = await pool.execute(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `No card found with id ${id}` });
    }
    // 204 No Content is typical for successful DELETE with no body
    return res.status(204).send();
  } catch (err) {
    console.error('[deletecard] error:', err);
    return res.status(500).json({ message: 'Server error - could not delete card' });
  }
});

// 404 for unknown routes (optional)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
