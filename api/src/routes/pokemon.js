const { Router } = require('express');
const router = Router();
const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


router.get('/', async (req, res) => {

    const apiPokemons = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
        .then(response => console.log(response))
})
module.exports = router;