import {GET_ALL_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_ID, GET_POKEMON_TYPES, ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_BY_TYPE, CLEAR_STATE, RESET_FILTER} from '../actions/actions';

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

        //ORDENAMIENTOS
        case ORDER_BY_NAME:
            const orderName = action.payload === "asc" ? 
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
            const orderAttack = action.payload === "attackAsc" ?
            state.pokemons.sort((a, b) => {
                return a.attack > b.attack
            }) :
            state.pokemons.sort((a, b) => {
                return a.attack < b.attack;
            });

            return{
                ...state,
                pokemons: orderAttack
            }

        //FILTRADOS
        case FILTER_BY_TYPE:
            let type = action.payload;
            const filteredBy = state.pokemons.filter(p=> p.types.includes(type))
            // const filteredPokes = state.pokemons.filter(p=> p.types.includes(type))
            if(filteredBy.length > 0){
                return {
                    ...state,
                    pokemons: filteredBy
                }
            } else {
                return {
                    ...state,
                    pokemons: state.pokemons
                }
            }

        case CLEAR_STATE:
            return {
                ...state,
                pokemon : {},
            }
        case RESET_FILTER:
            return {
                ...state,
                pokemons : [],
            }
        default: return state
    }
};



  export default rootReducer;