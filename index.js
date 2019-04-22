// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Its working');
})

server.get('/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user information could not be retrieved."
            })
        });
});

server.post('/users', (req, res) => {
    const userInformation = req.body;
    db
        .insert(userInformation)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(400).json({
                error: err,
                message: "Please provide name and bio for the user"
            })
        });
});

server.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .remove(userId)
        .then(() => {
            res.end();
        })
        .catch(err => {
            res.status(404).json({
                error: err,
                message: "The user with the specified ID does not exist."
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user could not be removed"
            });
        });
});

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
})