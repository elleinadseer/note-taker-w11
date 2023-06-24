const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile, 
} = require('/Users/danielle/bootcamp/note-taker-w11/helpers/jsUtils.js');

// GET route for retreving all theh tips 
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('/Users/danielle/bootcamp/note-taker-w11/db/db.json').then((data) => res.json (JSON.parse(data)));
});

// GET route for a specific tip
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('/Users/danielle/bootcamp/note-taker-w11/db/db.json')
    .then ((data) => JSON.parse(data))
    .then ((json) => {
        const result = json.filter((note) => note.tip_id === tipId);
        return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');

    });
});

// DELETE route for a specific tip 
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('/Users/danielle/bootcamp/note-taker-w11/db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id !==noteId);
        writeToFile('/Users/danielle/bootcamp/note-taker-w11/db/db.json', result);
        res.json(`Item ${noteId} has been deleted`);
    })
}); 

// POST route for a new UI/UX note
notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title, 
            text, 
            id: uuidv4(),
        };

        readAndAppend(newNote, '/Users/danielle/bootcamp/note-taker-w11/db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding Note');
    }
});

module.exports = notes; 