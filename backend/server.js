// 1. load dotenv (must be first)
require('dotenv').config();

// 2. require express, mongoose, cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 3. create the app
const app = express();

// 4. middleware: cors() and express.json()
app.use(cors());
app.use(express.json());

// 5. connect to MongoDB using process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err.message));

// 6. schema
const gymLeaderSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  region: { type: String, required: true, enum: ['Kanto', 'Johto', 'Hoenn'] },
  town: { type: String, required: true },
  badge: { type: String, required: true },
  specialty: { type: String, required: true },
  aceLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: 'aceLevel must be a whole number'
    }
  },
  motto: { type: String, maxlength: 150 }
});

// 7. model named 'GymLeader'
const GymLeader = mongoose.model('GymLeader', gymLeaderSchema);

// 8. routes

// 8a. GET all leaders
app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await GymLeader.find();
    res.status(200).json(leaders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 8b. GET one leader
app.get('/api/leaders/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    const leader = await GymLeader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    res.status(200).json(leader);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 8c. POST create leader
app.post('/api/leaders', async (req, res) => {
  try {
    const leader = new GymLeader(req.body);
    const savedLeader = await leader.save();
    res.status(201).json(savedLeader);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 8d. PUT update leader
app.put('/api/leaders/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    const updatedLeader = await GymLeader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLeader) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    res.status(200).json(updatedLeader);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 8e. DELETE leader
app.delete('/api/leaders/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    const deletedLeader = await GymLeader.findByIdAndDelete(req.params.id);
    if (!deletedLeader) {
      return res.status(404).json({ message: 'Gym Leader not found' });
    }
    res.status(200).json({ message: `${deletedLeader.name} was removed from the registry` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 9. listen on port 3000
app.listen(3000, () => console.log('Server running on port 3000'));