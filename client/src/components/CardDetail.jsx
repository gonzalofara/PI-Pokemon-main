import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getPokemonById, getAllPokemons, clearState} from '../redux/actions/actions';
import {Link} from 'react-router-dom';
import Loading from './Loading';

//*************TYPES ICONS*****************\\
import bug from '../resources/icons/bug.png'
import dark from '../resources/icons/dark.png'
import dragon from '../resources/icons/dragon.png'
import electric from '../resources/icons/electric.png'
import fairy from '../resources/icons/fairy.png'
import fighting from '../resources/icons/fighting.png'
import fire from '../resources/icons/fire.png'
import flying from '../resources/icons/flying.png'
import ghost from '../resources/icons/ghost.png'
import grass from '../resources/icons/grass.png'
import ground from '../resources/icons/ground.png'
import ice from '../resources/icons/ice.png'
import normal from '../resources/icons/normal.png'
import poison from '../resources/icons/poison.png'
import psychic from '../resources/icons/psychic.png'
import rock from '../resources/icons/rock.png'
import steel from '../resources/icons/steel.png'
import water from '../resources/icons/water.png'
import unknown from '../resources/icons/unknown.png'
//*************POKE GIFS*****************\\

//************* CSS *****************\\
import s from './CardDetail.module.css'


const CardDetail = (props) => {

    let idParam = props.match.params.id;
    let pokemon = useSelector(state => state.pokemon)
    const dispatch = useDispatch();
    
    console.log(pokemon)


    const desmontar = ()=> {
        dispatch(clearState())
    }

    useEffect(()=> {
        dispatch(getAllPokemons())
        dispatch(getPokemonById(idParam))
    }, [dispatch, idParam]);

  return (
    <div className={s.body}>
        {  pokemon.name !== undefined && pokemon.image ?
            
        <div className={s.aux}>
            <div className={s.aux1}>
                <img className={s.image} src={pokemon.image} alt="pokemon-img" />
                <h1 className={s.pokeName}>{pokemon.name}</h1>
            </div>

            <div className={s.types}>
                <div className={s.type}>
                    <p className={s.type1}>{pokemon.types[0]? pokemon.types[0] : null}</p>
                    <img src={(pokemon.types[0] ==='bug') ? bug : (pokemon.types[0]==='dark') ? dark : (pokemon.types[0]==='dragon') ? dragon : (pokemon.types[0]==='electric') ? electric : (pokemon.types[0]==='fairy') ? fairy : ( pokemon.types[0]==='fighting') ? fighting : (pokemon.types[0]==='fire') ? fire : (pokemon.types[0]==='flying') ? flying : (pokemon.types[0]==='ghost') ? ghost : (pokemon.types[0]==='grass') ? grass : (pokemon.types[0]==='ground') ? ground : (pokemon.types[0]==='ice') ? ice :( pokemon.types[0]==='normal') ? normal : (pokemon.types[0]==='poison') ? poison : (pokemon.types[0]==='psychic') ? psychic : (pokemon.types[0]==='rock') ? rock : (pokemon.types[0]==='steel') ? steel : (pokemon.types[0]==='water') ? water : (pokemon.types[1]==='unknown') ? unknown : null} alt='type-icon' className={s.typeicons}></img>
                </div>
                                
                <div className={s.type}>
                    <p className={s.type2}>{pokemon.types[0]? pokemon.types[1] : null}</p>
                    <img src={(pokemon.types[1] ==='bug') ? bug : (pokemon.types[1]==='dark') ? dark : (pokemon.types[1]==='dragon') ? dragon : (pokemon.types[1]==='electric') ? electric : (pokemon.types[1]==='fairy') ? fairy : ( pokemon.types[1]==='fighting') ? fighting : (pokemon.types[1]==='fire') ? fire : (pokemon.types[1]==='flying') ? flying : (pokemon.types[1]==='ghost') ? ghost : (pokemon.types[1]==='grass') ? grass : (pokemon.types[1]==='ground') ? ground : (pokemon.types[1]==='ice') ? ice :( pokemon.types[1]==='normal') ? normal : (pokemon.types[1]==='poison') ? poison : (pokemon.types[1]==='psychic') ? psychic : (pokemon.types[1]==='rock') ? rock : (pokemon.types[1]==='steel') ? steel : (pokemon.types[1]==='water') ? water : (pokemon.types[1]==='unknown') ? unknown : null} alt='' className={s.typeicons} hidden={pokemon.types.length < 2 ? true : false}></img> 
                </div>
            </div>
            <div className={s.gifs}>
                {/* {gifAssignment(pokemon.name)} */}
                <img className={s.pokegif} src={require(`../resources/gifs/${pokemon.name}.gif`)} alt="gif" />   
            </div>
            <div className={s.detailContainer}>
                <p className={s.data}><span className={s.span}>Hp</span>{pokemon.health}</p>

                <p className={s.data}><span className={s.span}>Attack</span>{pokemon.attack}</p>

                <p className={s.data}><span className={s.span}>Defense</span>{pokemon.defense}</p>

                <p className={s.data}><span className={s.span}>Speed</span>{pokemon.speed}</p>

                <p className={s.data}><span className={s.span}>Height</span>{pokemon.height}</p>

                <p className={s.data}><span className={s.span}>Weight</span>{pokemon.weight}</p>
            </div>

            <Link to="/home" onClick={()=> desmontar()}><button className={s.btnPokemon}>Home</button></Link>
        </div>
        : <Loading/> }
        


    </div>
  )
}

export default CardDetail;