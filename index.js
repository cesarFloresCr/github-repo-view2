const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req,res) => {
    try {
        const githubUsername = 'cesarFloresCr';
        const githubResponse = await axios.get(`https://api.github.com/users/${githubUsername}/repos`);
        const repositories = githubResponse.data.map(repo => repo.name);
        res.send(`<h1>Repositorios de ${githubUsername}</h1><ul>${repositories.map(repo => `<li>${repo}</li>`).join('')}</ul>`);
    } catch (error){
        console.error('Error al obtener repositorios de Github: ', error.message);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen (PORT, () => {
    console.log(`Servidor escucando en http://localhost:${PORT}`);
});
