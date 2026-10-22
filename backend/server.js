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
//    log "Connected to MongoDB" on success, log the error on fail

// 6. schema
//    name: String, required, minlength 2
//    region: String, required, enum ['Kanto', 'Johto', 'Hoenn']
//    town: String, required
//    badge: String, required
//    specialty: String, required
//    aceLevel: Number, required, min 1, max 100
//    motto: String, maxlength 150

// 7. model named 'GymLeader'

// 8. routes go here (Step 3)

// 9. listen on port 3000, log "Server running on port 3000"