// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

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
        })
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
})