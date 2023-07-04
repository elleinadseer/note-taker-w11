const express = require ('express');

// Connecting to notes
const notesRouter = require('./notes');

// Initialising express
const app = express();

// Connecting to notes router
app.use('/notes', notesRouter);

module.exports = app;