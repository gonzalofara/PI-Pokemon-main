const axios = require('axios');

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';

export const getAllPokemons = () => {
    try {
        return function(dispatch) {
            return axios.get('http://localhost:3001/pokemons')
                .then(json => dispatch({ type: GET_ALL_POKEMONS, payload: json.data}))
        }
    } catch (error) {
        return 'Ha ocurrido un error. Intenta recargando la Página'
    }
    
} 



//PRUEBA GET_ALL_POKEMONS
/*  const getAllPokemons = () => {
    try {
        axios.get('http://localhost:3001/pokemons')
            .then(json => json.data)
        }
    catch (error) {
        return 'Ha ocurrido un error. Intenta recargando la Página'
    }
    
}

console.log(getAllPokemons()); */