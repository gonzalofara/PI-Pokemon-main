const { Router } = require('express');
const router = Router(); //express.Router('')
const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


router.get('/', async (req, res) => {

    try{

        const pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        const pokemonsRoutes = pokemonApi.data.results.map(pokemon => axios.get(pokemon.url));
        const pokemonsData = await axios.all(pokemonsRoutes);
  
        const apiPokemons = pokemonsData.map( p => {
          
            const pokemon = {
                pokeID: p.data.id,
                name: p.data.name,
                health: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                deffense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                image: p.data.sprites.versions['generation-v']['black-white'].animated.front_default || p.data.sprites.front_default
            }
            return pokemon;
        });
  
        const pokemonDB = await Pokemon.findAll({
          include: {
            model: Type,
            attributes: ['name'],
          }
        })
  
        const dbPokemons = pokemonDB.map(p => {
          const pokemon = {
            pokeID: p.pokeID,
            name: p.name,
            health: p.health,
            attack: p.attack,
            deffense: p.deffense,
            speed: p.speed,
            height: p.height,
            weight: p.weight,
            image: p.image
          }
          return pokemon;
        })
        
        const allPokemons = [...apiPokemons, ...dbPokemons];
        
        const {name} = req.query;
        if(name){
            const pokemonByName = allPokemons.filter(p => p.name.toLowerCase() === name.toLowerCase());
            pokemonByName.length > 0 ? res.status(200).json(pokemonByName) : res.status(400).send('No se encontró un Pokemon con ese nombre')
        }
        
        return res.status(200).json(allPokemons);
    
    } catch (err) {
        throw new Error(err.message)
    }
    
});

module.exports = router;