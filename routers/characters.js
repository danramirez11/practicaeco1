const express = require('express');
const { z } = require('zod');
const router = express.Router();
const { characters, artifacts, users } = require('./../database');

const Character = require('./../models/Character');
const schChar = require('./../schemas/schChar');

router.route('/')
    .get((req, res) => {
        res.send(characters);
    })
    .post((req, res) => {
        console.log(req.body);
            const id = Date.now().toString(36) + Math.random().toString(36);
            const char = schChar.parse({ id, ...req.body });
            const charObject = new Character(char.id, char.name, char.level, char.type, char.userid);
            const user = users.find(user => user.id === char.userid);
                if (user) {
                    characters.push(charObject);
                } else {
                    res.status(404).send('User not found');
                }

        res.send(`Character ${charObject.name} added to ${user.name}'s account`);
        
})

router.route('/level')
    .get((req, res) => {
        const charWithHighestLevel = characters.reduce((prevChar, currentChar) => {
            return currentChar.level > prevChar.level ? currentChar : prevChar;
        });
        res.send(charWithHighestLevel);
});

router.route('/promlevel')
    .get((req, res) => {
        const totalLevels = characters.reduce((sum, char) => sum + char.level, 0);
        const meanLevel = totalLevels / characters.length;
        res.send(`Mean level of all characters: ${meanLevel}`);
});

router.route('/:id')
    .get((req, res) => {
        const char = characters.find(char => char.id === req.params.id);
        if (char) {
            res.send(char);
        } else {
            res.status(404).send('Character not found');
        }
    })
    .put((req, res) => {
        const char = characters.find(char => char.id === req.params.id);
        if (char) {
            try {
                const charUpdate = schChar.parse(req.body);
                char.name = charUpdate.name;
                char.level = charUpdate.level;
                char.type = charUpdate.type;
                res.send(`Character ${char.name} updated`);
            } catch (error) {
                res.status(400).send(error.errors);
            }
        } else {
            res.status(404).send('Character not found');
        }
    })
    .delete((req, res) => {
        const char = characters.find(char => char.id === req.params.id);
        if (char) {
            characters.splice(characters.indexOf(char), 1);
            res.send(`Character ${char.name} deleted`);
        } else {
            res.status(404).send('Character not found');
        }
    });

module.exports = router;