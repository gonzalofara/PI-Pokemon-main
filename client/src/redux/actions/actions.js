/* eslint-disable no-unreachable */
const axios = require('axios');

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
export const GET_POKEMON_ID = 'GET_POKEMON_ID';
export const GET_POKEMON_TYPES = 'GET_POKEMON_TYPES';

export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED';

export const CLEAR_STATE = 'CLEAR_STATE';
export const RESET_FILTER = 'RESET_FILTER';

export const getAllPokemons = () => {
    try {
        return async function(dispatch) {
            return fetch('http://localhost:3001/pokemons')
                .then(res => res.json())
                .then(data => dispatch({ type: GET_ALL_POKEMONS, payload: data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error. Intenta recargando la Página.'
    }
    
};

export const getPokemonByName = (name) => {
    return async function(dispatch) {
        try {
            axios.get(`http://localhost:3001/pokemons?name=${name}`)
                .then(json => dispatch({type: GET_POKEMON_NAME, payload: json.data}))
            
        } catch (error) {
            return 'Ha ocurrido un error, intenta nuevamente.'
        }
    }
}; 

 export const getPokemonById = (id) => {
    try {
        return function(dispatch) {
            return axios.get(`http://localhost:3001/pokemons/${id}`)
                .then(json => dispatch({type: GET_POKEMON_ID, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
}; 

export const createPokemon = (pokemon) => {
    try {
        return function(dispatch) {
            return axios.post('http://localhost:3001/pokemons', pokemon)
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
}; 

export const getPokemonTypes = () => {
    try {
        return function(dispatch) {
            return axios.get('http://localhost:3001/types')
                .then(json => dispatch({type: GET_POKEMON_TYPES, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error, intenta nuevamente.'
    }
};

//ORDENAMIENTOS
export const orderByName = (order) => {
    
    return {
        type: ORDER_BY_NAME,
        payload: order
    }
}

export const orderByAttack = (order) => {
    return {
        type: ORDER_BY_ATTACK,
        payload: order
    }
}

//FILTRADOS
export const filterByType = (type) => {
    return {
        type: FILTER_BY_TYPE,
        payload: type
    }
}
export const filterByCreated = (type) => {
    return {
        type: FILTER_BY_CREATED,
        payload: type
    }
}
export const clearState = () =>{
    return {type: CLEAR_STATE}
}
export const resetFilter = () =>{
    return {type: RESET_FILTER}
}


//PRUEBA GET_ALL_POKEMONS
//   const getAllPokemons = async () => {
//     try {
//         await axios.get('http://localhost:3001/pokemons')
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
// const createPokemon = (pokemon) => {
    
//     try {
//         axios.post('http://localhost:3001/pokemons', pokemon)
//     } catch (error) {
//         return 'error'
//     }
    
// }


// let poke = {
//     name: "prueba3 front",
//     health: 88,
//     attack: 16, 
//     defense: 13, 
//     speed: 38, 
//     height: 55, 
//     weight: 45,
//     types: ["normal"]
//   }

// getAllPokemons()
// getPokemonByName('charmander'); 
// getPokemonById(8)
// getTypes()
// createPokemon(poke)