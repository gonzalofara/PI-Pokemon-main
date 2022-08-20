const { Router } = require('express');
const router = Router();
const { Pokemon, Type } = require('../db');
const axios = require('axios');

router.get('/', async (req,res) => {

    try {
        
        const apiPromise = await axios.get('https://pokeapi.co/api/v2/type');
        let typesFromApi = apiPromise.data.results.map(t => t.name).sort(); //TIPOS POR ORDEN ALFABETICO
        console.log(typesFromApi)
        const pokeTypes = await Type.findAll({ attributes: ["id", "name"] });

        if (pokeTypes.length > 0) {
            return res.status(200).json(pokeTypes)
        } else {
            typesFromApi.forEach(t => {
                Type.bulkCreate([{name: t}])
            }) 
            
            const typesAdded = await Type.findAll({ attributes: ["id", "name"] });
            return res.status(200).json(typesAdded);
        }
        
    } catch (error) {
        res.status(404).send('No se encontraron Tipos de Pokemones')
    }

});


module.exports = router;