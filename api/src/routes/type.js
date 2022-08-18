const { Router } = require('express');
const router = Router();
const { Pokemon, Type } = require('../db');
const axios = require('axios');

router.get('/', async (req,res) => {


    
    try {
        const apiPromise = await axios.get('https://pokeapi.co/api/v2/type')
        const apiResponse = apiPromise.data.results.filter(t => {
            return { name: t.name !== 'unknown'}
        
        });

        const typeExists = await Type.findAll();
        if(typeExists.length > 1) {
            res.status(200).json(typeExists);  
        } else {
            await Type.bulkCreate(apiResponse)
            res.status(200).json(apiResponse);

        }    

    } catch (error) {
        res.status(404).send('No se encontraron Tipos de Pokemones')
    }

});


module.exports = router;