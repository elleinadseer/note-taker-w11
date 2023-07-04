const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Port compatible with Heroku
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Directing through public folder
app.use(express.static('public'));

// Enter through index.html
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Redirect to /notes
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// Cover alternative redirects to error page
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, 'public/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
