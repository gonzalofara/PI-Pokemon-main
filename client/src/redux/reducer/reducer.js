import {GET_ALL_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_ID, GET_POKEMON_TYPES, FILTER_BY_NAME} from '../actions/actions';

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
        case FILTER_BY_NAME:
            const selected = action.payload === 'Name asc' ? state.pokemons.sort((a,b) => {
                a.toLowerCase()
                b.toLowerCase()
                if(a > b) return 1
                if(a < b) return -1
                return 0
            }) : state.pokemons.sort((a,b) => {
                a.toLowerCase()
                b.toLowerCase()
                if(a > b) return -1
                if(a < b) return 1
                return 0
            })
            return{
                ...state,
                pokemons: selected
            }
        default: return state
    }
};



  export default rootReducer;