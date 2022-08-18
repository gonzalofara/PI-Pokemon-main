const { Router } = require('express');
const router = Router(); //express.Router('')
const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


router.post('/', async (req, res) => {

    const {name, health, attack, defense, speed, height, weight} = req.body;
    try {
        const newPokemon = await Pokemon.create({
            name: name, health: health, attack: attack, defense: defense, speed: speed, height: height, weight: weight
        })
        
        console.log(newPokemon.toJSON());
        res.json(newPokemon);
    } catch (error) {
        res.send(error)
    }
})

router.get('/', async (req, res) => {

    const {name} = req.query;

    if(name){
        
        try {
            const dbPokemon = await Pokemon.findOne({
                where: {
                    name: {
                      [Op.iLike]: `%${name}%`,
                    },
                  },
                  include: {
                    model: Type,
                    attributes: ['name'],
                  }
            });

            if(dbPokemon) return res.status(200).json(dbPokemon);
            
            const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

            const matchedPokemon = {
                pokeID: apiPokemon.data.id,
                name: apiPokemon.data.forms[0].name,    //capitalizar
                health: apiPokemon.data.stats[0].base_stat,
                attack: apiPokemon.data.stats[1].base_stat,
                defense: apiPokemon.data.stats[2].base_stat,
                speed: apiPokemon.data.stats[5].base_stat,
                height: apiPokemon.data.height,
                weight: apiPokemon.data.weight,
                types: apiPokemon.data.types.map(t => t.type.name), //capitalizar
                image: apiPokemon.data.sprites.front_default,
            };

            return res.status(200).json(matchedPokemon); 
            
        } catch (error) {
            return res.status(404).send('No se encontró un Pokemon con ese nombre');
        }
        
    } else{
        
        try {

            const dbPokemons = await Pokemon.findAll(
                {
                    attributes: ['pokeID', 'name', 'image']
                },
                {
                    include: {
                        model: Type,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        }
                }}
            );
            
            let apiPromise = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
            apiPromise = apiPromise.data.results?.map(pokemon => axios.get(pokemon.url));
            const responsePromise = await axios.all(apiPromise);
            const apiPokemons = responsePromise.map(p => {
                return {
                    pokeID: p.data.id,
                    name: p.data.name,
                    image: p.data.sprites.front_default
                }
            });

            let allPokemons = apiPokemons.concat(dbPokemons);
            return res.status(200).json(allPokemons);
        } catch (error) {
            return res.status(404).send(error)
        }
    }

});

router.get('/:idPokemon', async (req, res) => {

    const {idPokemon} = req.params;

    if(idPokemon.length > 4) {
        try {
            const dbPokemonID = await Pokemon.findByPk(idPokemon, { include: [Type] });
            if(dbPokemonID !== null) return res.status(200).json(dbPokemonID);
        } catch (error) {
            return res.status(404).send('No se encontró un Pokemon con ese ID')
        }
    }
    
    try {
        const apiPokemonID = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const matchedPokemon = {
            pokeID: apiPokemonID.data.id,
            name: apiPokemonID.data.forms[0].name,
            health: apiPokemonID.data.stats[0].base_stat,
            attack: apiPokemonID.data.stats[1].base_stat,
            defense: apiPokemonID.data.stats[2].base_stat,
            speed: apiPokemonID.data.stats[5].base_stat,
            height: apiPokemonID.data.height,
            weight: apiPokemonID.data.weight,
            image: apiPokemonID.data.sprites.front_default,
        };

        return res.status(200).json(matchedPokemon);

    } catch (error) {
        res.status(404).send('No se encontró un Pokemon con ese ID')
    }
})




    




module.exports = router;