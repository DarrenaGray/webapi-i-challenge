// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/api', (req, res) => {
    res.send('Its working');
})

server.get('/api/users', (req, res) => {
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

server.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .findById(userId)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });
            };
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user information could not be retrieved."
            })
        });
});

server.post('/api/users', (req, res) => {
    const userInformation = req.body;

    if (userInformation.name && userInformation.bio) {
        db
            .insert(userInformation)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    message: "There was an error while saving the user to the database"
                })
            });
    } else {
        res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
});

server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    db
        .remove(userId)
        .then(deleted => {
            if (deleted) {
                res.status(201).end();
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                message: "The user could not be removed"
            });
        });
});

server.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const userInformation = req.body;

    if (userInformation.name && userInformation.bio) {
        db
            .update(userId, userInformation)
            .then(userUpdated => {
                if (userUpdated) {
                    console.log(userUpdated)
                    res.status(200).json(userUpdated)
                } else {
                    res.status(404).json({
                        message: "The user with the specified ID does not exist."
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err,
                    message: "The user could not be modified"
                });
            })
    } else {
        res.status(400).json({
            message: "Please provide name and bio for the user."
        })
    }
})

server.listen(5000, () => {
    console.log('\n*** API running on port 5k ***\n')
})