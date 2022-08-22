import {GET_ALL_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_ID, GET_POKEMON_TYPES} from '../actions/actions';

const initialState = {
    pokemons: [],
    types: [],
    pokemon: {},
    newPokemon: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload 
            }
        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_ID:
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_TYPES:
            return {
                ...state,
                types: action.payload
            }
        
        default: return state
    }
};



  export default rootReducer;