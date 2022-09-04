import {GET_ALL_POKEMONS, GET_POKEMON_NAME, GET_POKEMON_ID, GET_POKEMON_TYPES, ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_BY_TYPE, FILTER_BY_CREATED, CLEAR_STATE, RESET_FILTER} from '../actions/actions';

const initialState = {
    pokemons: [],
    types: [],
    pokemon: {},
    newPokemon: {},
    filters: [],
    error: ''
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
                return a.name.toLowerCase() > b.name.toLowerCase()
            }) :
            state.pokemons.sort((a, b) => {
                return a.name.toLowerCase() < b.name.toLowerCase();
            });
            return {
                ...state,
                pokemons: orderName
            }

        case ORDER_BY_ATTACK:
            const orderAttack = action.payload 
            if(orderAttack === 'attackAsc')
                return {
                    ...state,
                    pokemons:  state.pokemons.sort((a, b) =>  a.attack > b.attack)
                }
            else if(orderAttack === 'attackDesc')
                return {
                    ...state,
                    pokemons: state.pokemons.sort((a, b) => a.attack < b.attack)
                }
            break;
            

        //FILTRADOS
        case FILTER_BY_TYPE:
            let type = action.payload;
            const filteredBy = state.pokemons.filter(p=> p.types.includes(type))
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

        case FILTER_BY_CREATED:
            let created = state.pokemons.filter(p=> typeof p.id === 'string')
            let api = state.pokemons.filter(p=> typeof p.id === 'number')
            if(action.payload === 'created'){
                return{
                    ...state,
                    pokemons: created
                }
            } else if(action.payload === 'api'){
                return {
                    ...state,
                    pokemons: api
                }
            } else if(action.payload === 'default'){
                return {
                    ...state,
                    pokemons: state.pokemons
                }
            } 
        break    
            
        case CLEAR_STATE:
            return {
                ...state,
                pokemon : {},
            }
        case RESET_FILTER:
            return {
                ...state,
                pokemons: state.pokemons
            }
        default: return state
    }
};



  export default rootReducer;