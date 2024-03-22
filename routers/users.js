const express = require('express');
const { z } = require('zod');
const router = express.Router();
const { users, characters } = require('./../database');

const User = require('./../models/User');
const schUser = require('./../schemas/schUser');

router.route('/')
    .get((req, res) => {
        res.send(users);
    })
    .post((req, res) => {
        try {
            const id = Date.now().toString(36) + Math.random().toString(36);
            const user = schUser.parse({id, ...req.body});
            const userObject = new User(user.id, user.name, user.lastname, user.email);
            users.push(userObject);
            res.send(`User ${userObject.name} added`);
            console.log(users);
        } catch (error) {
            res.status(400).send(error.errors);
        }
});

router.route('/mostcharacters')
    .get((req, res) => {
        const userWithMostCharacters = users.reduce((prevUser, currentUser) => {
            const currentUserCharacters = characters.filter(character => character.userid === currentUser.id);
            const prevUserCharacters = characters.filter(character => character.userid === prevUser.id);
            return currentUserCharacters.length > prevUserCharacters.length ? currentUser : prevUser;
        });
        res.send(userWithMostCharacters);
});

router.route('/:id')
    .get((req, res) => {
        const user = users.find(user => user.id === req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    })
    .put((req, res) => {
        const user = users.find(user => user.id === req.params.id);
        if (user){
            users.splice(users.indexOf(user), 1);
            res.send(`User ${user.name} deleted`)
        } else {
            res.status(404).send(`User not found`);
        }
    })
    .delete((req, res) => {
        if (art) {
            try {
                const art = artifacts.find(art => art.id === req.params.id);
                artifacts.splice(artifacts.indexOf(art), 1); 
                res.send(`Artifact ${art.name} deleted`)
            } catch (error) {
                res.status(400).send(error.errors)
            }
        } else {
            res.status(404).send('Artifact not found');
        }
});

router.route('/:id/characters')
    .get((req, res) => {
        const userCharacters = characters.filter(character => character.userid === req.params.id);
        res.send(userCharacters);
});


module.exports = router;