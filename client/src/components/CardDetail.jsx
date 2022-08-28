import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getPokemonById, getAllPokemons, clearState} from '../redux/actions/actions';
import {Link} from 'react-router-dom';
import Loading from './Loading';
import s from './CardDetail.module.css'

const CardDetail = (props) => {

    let idParam = props.match.params.id;
    const pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch();

    const desmontar = ()=> {
        dispatch(clearState())
    }
    useEffect(()=> {
        dispatch(getAllPokemons())
        dispatch(getPokemonById(idParam))
    }, [dispatch, idParam,]);
    
  return (
    <div className={s.body}>
        {  pokemon.name !== undefined ?
            
        <div className={s.aux}>
            <div className={s.detailContainer}>
                
                <img className={s.image} src={pokemon.image} alt="pokemon-img" />
                <h1 className={s.pokeName}>{pokemon.name}</h1>
                <div className={s.description}>
                    
                        <p className={s.data}><span className={s.span}>Hp</span> {pokemon.health}</p>
                    
                    
                        <p className={s.data}><span className={s.span}>Attack</span> {pokemon.attack}</p>
                    
                    
                        <p className={s.data}><span className={s.span}>Defense</span> {pokemon.defense}</p>
                    
                    
                        <p className={s.data}><span className={s.span}>Speed</span> {pokemon.speed}</p>
                    
                    
                        <p className={s.data}><span className={s.span}>Height</span> {pokemon.height}</p>
                    
                    
                        <p className={s.data}><span className={s.span}>Weight</span> {pokemon.weight}</p>
                    
                    </div>
                    <div>                    
                       <p className={s.types}>{pokemon.types?.join(' - ')}</p>
                    </div>
            
            </div>
        </div> 
        : <Loading/> }  
            <Link to="/home" onClick={()=> desmontar()}><button className={s.btnPokemon}>Home</button></Link>
              
    </div>
  )
}

export default CardDetail;