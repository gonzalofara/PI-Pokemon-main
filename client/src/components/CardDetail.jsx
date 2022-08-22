import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getPokemonById} from '../redux/actions/actions'


const CardDetail = (props) => {

    let idParam = props.match.params.id;
    const pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPokemonById(idParam))
    }, [dispatch, idParam]);

  return (
    <div>
        {   
            <div>

                <img src={pokemon.image} alt="pokemon-img" />
                <h1>{pokemon.name}</h1>
                <p>Hp: {pokemon.health}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Defense: {pokemon.defense}</p>
                <p>Speed: {pokemon.speed}</p>
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Types: {pokemon.types?.join(', ')}</p>

            </div>
        }
    </div>
  )
}

export default CardDetail;