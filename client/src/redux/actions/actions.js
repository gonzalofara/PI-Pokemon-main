const axios = require('axios');

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_POKEMON_ID = 'GET_POKEMON_ID';
export const GET_POKEMON_TYPES = 'GET_POKEMON_TYPES';

export const getAllPokemons = () => {
    try {
        return function(dispatch) {
            return axios.get('http://localhost:3001/pokemons')
                .then(json => dispatch({ type: GET_ALL_POKEMONS, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error. Intenta recargando la Página.'
    }
    
}

export const getPokemonByName = (name) => {
    try {
        return function(dispatch) {
            return axios.get(`http://localhost:3001/pokemons?name=${name}`)
                .then(json => dispatch({type: GET_POKEMON_NAME, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
} 

 export const getPokemonById = (id) => {
    try {
        return function(dispatch) {
            return axios.get(`http://localhost:3001/pokemons/${id}`)
                .then(json => dispatch({type: GET_POKEMON_ID, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
} 

export const createPokemon = (pokemon) => {
    try {
        return function(dispatch) {
            return axios.post('http://localhost:3001/pokemons', pokemon)
        }
    } catch (error) {
        'Ha ocurrido un error, intenta nuevamente.'
    }
} 

export const getPokemonTypes = () => {
    try {
        return function(dispatch) {
            return axios.get('http://localhost:3001/types')
                .then(json => dispatch({type: GET_POKEMON_TYPES, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
}



//PRUEBA GET_ALL_POKEMONS
//   const getAllPokemons = () => {
//     try {
//         axios.get('http://localhost:3001/pokemons')
//             .then(json => console.log(json.data))
//         }
//     catch (error) {
//         return 'Ha ocurrido un error. Intenta recargando la Página'
//     }
    
// }
// //PRUEBA GET_POKEMON_NAME
//   const getPokemonByName = (name) => {
//     try {
//         axios.get(`http://localhost:3001/pokemons?name=${name}`)
//             .then(json => console.log(json.data))
//         }
//     catch (error) {
//         return 'Ha ocurrido un error. Intenta recargando la Página'
//     }
    
// }
////PRUEBA GET_POKEMON_ID    
//   const getPokemonById = (id) => {
//     try {
//         axios.get(`http://localhost:3001/pokemons/${id}`)
//             .then(json => console.log(json.data))
//         }
//     catch (error) {
//         return 'Ha ocurrido un error. Intenta recargando la Página'
//     }
    
// }
// //PRUEBA GET_POKEMON_TYPES 
// const getTypes = () => {
//     try {
//         axios.get(`http://localhost:3001/types`)
//             .then(json => console.log(json.data))
//         }
//     catch (error) {
//         return 'Ha ocurrido un error. Intenta recargando la Página'
//     }
    
// }


// //PRUEBA CREATE_POKEMON 
const createPokemon = (pokemon) => {
    
    try {
        axios.post('http://localhost:3001/pokemons', pokemon)
    } catch (error) {
        return 'error'
    }
    
}


let poke = {
    name: "prueba3 front",
    health: 88,
    attack: 16, 
    defense: 13, 
    speed: 38, 
    height: 55, 
    weight: 45,
    types: ["normal"]
  }

// getAllPokemons()
// getPokemonByName('charmander'); 
// getPokemonById(8)
// getTypes()
createPokemon(poke)