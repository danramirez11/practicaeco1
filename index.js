const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const artifacts = require('./routers/artifacts');
const characters = require('./routers/characters');
const users = require('./routers/users');

app.use('/artifacts', artifacts);
app.use('/characters', characters);
app.use('/users', users);

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
})
