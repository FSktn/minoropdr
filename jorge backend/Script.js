// Import the express library
const express = require('express');

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data for rooms and schedules
const rooms = {
  'A101': [],
  'B202': [],
  'C303': []
};

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Get all rooms
app.get('/rooms', (req, res) => {
  res.json(Object.keys(rooms));
});

// Get schedule for a specific room
app.get('/rooms/:roomId/schedule', (req, res) => {
  const { roomId } = req.params;
  if (!rooms[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  res.json(rooms[roomId]);
});

// Add a schedule entry to a room
app.post('/rooms/:roomId/schedule', (req, res) => {
  const { roomId } = req.params;
  const { time, klas, docent } = req.body;
  if (!rooms[roomId]) {
    return res.status(404).json({ error: 'Room not found' });
  }
  if (!time || !klas || !docent) {
    return res.status(400).json({ error: 'Missing time, klas, or docent' });
  }
  const entry = { time, klas, docent };
  rooms[roomId].push(entry);
  res.status(201).json(entry);
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
