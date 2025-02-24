// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Siva@2002', // Replace with your database password
  database: 'music_db' // Replace with your database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database.');
});

// API endpoint to get all songs
app.get('/api/songs', (req, res) => {
  db.query('SELECT * FROM songs', (err, results) => {
    if (err) {
      console.error('Error fetching songs:', err);
      res.status(500).json({ error: 'Failed to retrieve songs' });
      return;
    }
    res.json(results);
  });
});

// API endpoint to create a new song
app.post('/api/songs', (req, res) => {
  const { path, displayName, cover, artist } = req.body;

  if (!path || !displayName || !cover || !artist) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO songs (path, displayName, cover, artist) VALUES (?, ?, ?, ?)';
  const values = [path, displayName, cover, artist];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting song:', err);
      res.status(500).json({ error: 'Failed to add song' });
      return;
    }
    res.status(201).json({ id: result.insertId, path, displayName, cover, artist });
  });
});

// API endpoint to update a song
app.put('/api/songs/:id', (req, res) => {
  const songId = req.params.id;
  const { path, displayName, cover, artist } = req.body;

  const query = 'UPDATE songs SET path = ?, displayName = ?, cover = ?, artist = ? WHERE id = ?';
  const values = [path, displayName, cover, artist, songId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating song:', err);
      res.status(500).json({ error: 'Failed to update song' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    res.json({ id: songId, path, displayName, cover, artist });
  });
});

// API endpoint to delete a song
app.delete('/api/songs/:id', (req, res) => {
  const songId = req.params.id;

  const query = 'DELETE FROM songs WHERE id = ?';
  const values = [songId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error deleting song:', err);
      res.status(500).json({ error: 'Failed to delete song' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    res.status(204).end(); // No content response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
