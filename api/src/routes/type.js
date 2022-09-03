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

router.post('/typecreate', async(req, res) => {

    try {
        const {name} = req.body;
    if(!name) res.status(400).send('Type Name is required')

    let exists = await Type.findOne({
        where: {name: name}
    })

    if(exists) res.status(400).send('Pokemon already exists')

    let newType = await Type.create({
        name: name
    })

    if(newType) res.status(200).json(newType)

    } catch (error) {
        res.status(400).json(error.message)
    }


})


module.exports = router;