const express = require('express');
const { z } = require('zod');
const router = express.Router();
const { characters, artifacts, users } = require('./../database');

const Artifact = require('./../models/Artifact');
const schArt = require('./../schemas/schArt');

router.route('/')
    .get((req, res) => {
        res.send(artifacts);
    })
    .post((req, res) => {
        try {
            const id = Date.now().toString(36) + Math.random().toString(36);
            const art = schArt.parse({id, ...req.body});
            const artObject = new Artifact(art.id, art.name, art.type, art.mod, art.charid);
            artifacts.push(artObject);
            
            const char = characters.find(char => char.id === art.charid);
                if (char) {
                    char.inventory.push(artObject);
                } else {
                    res.status(404).send('Character not found');
                }
            
            res.send(`Artifact ${artObject.name} added to ${char.name}'s inventory`);
        } catch (error) {
            res.status(400).send(error.errors);
        }
});

router.route('/search')
    .get((req, res) => {
        const mod = req.query.mod;
        const type = req.query.type;
        const art = artifacts.filter(art => art.mod === mod && art.type === type);
        res.send(art);
});

router.route('/:id')
    .get((req, res) => {
        const art = artifacts.find(art => art.id === req.params.id);
        if (art) {
            res.send(art);
        } else {
            res.status(404).send('Artifact not found');
        }
    })
    .put((req, res) => {
        const art = artifacts.find(art => art.id === req.params.id);
        if (art) {
            try {
                const artUpdate = schArt.parse(req.body);
                art.name = artUpdate.name;
                art.type = artUpdate.type;
                art.mod = artUpdate.mod;
                res.send(`Artifact ${art.name} updated`);
            } catch (error) {
                res.status(400).send(error.errors);
            }
        } else {
            res.status(404).send('Artifact not found');
        }
    })
    .delete((req, res) => {
        const art = artifacts.find(art => art.id === req.params.id)
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
    })

module.exports = router;