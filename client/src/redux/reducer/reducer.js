import {GET_ALL_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_ID, GET_POKEMON_TYPES, ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_BY_TYPE, CLEAR_STATE} from '../actions/actions';

const initialState = {
    pokemons: [],
    types: [],
    pokemon: {},
    newPokemon: {},
    filtered : []
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
        
        case FILTER_BY_TYPE: 
            return {
                ...state,
                pokemons: state.pokemons.filter(p => p.types === action.payload)
            }
        
        case ORDER_BY_NAME:
            let orderName = action.payload === "asc" ? 
            state.pokemons.sort((a, b) => {
                return a.name > b.name
            }) :
            state.pokemons.sort((a, b) => {
                return a.name < b.name;
            });
            return {
                ...state,
                pokemons: orderName
            }

        case ORDER_BY_ATTACK:
            let orderAttack = action.payload === "asc" ?
                state.pokemons.sort((a, b) => {
                    return a.attack - b.attack
                }) :
                state.pokemons.sort((a, b) => {
                    return b.attack - a.attack
                })
            return{
                ...state,
                pokemons: orderAttack
            }

        case CLEAR_STATE:
            return {
                ...state,
                pokemon : {},
            }
        default: return state
    }
};



  export default rootReducer;