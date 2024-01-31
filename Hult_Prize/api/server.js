const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mernmap');

app.use(express.json());
// const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const Marker = mongoose.model('Marker', markerSchema);

app.get('/api/markers', async (req, res) => {
  const markers = await Marker.find();
  res.json(markers);
});

app.post('/api/markers', async (req, res) => {
  const { lat, lng } = req.body;
  const newMarker = new Marker({ lat, lng });
  await newMarker.save();
  res.json(newMarker);
});

// Add routes here if needed

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

