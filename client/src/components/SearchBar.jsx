import React, {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { useHistory} from "react-router-dom";
import {getPokemonByName} from '../redux/actions/actions';
import s from './SearchBar.module.css';
// import Loading from './Loading';


const SearchBar = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    let history = useHistory();
    let allPokemons = useSelector((state) => state.pokemons);


    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let matched = allPokemons.find(p => p.name === input);
        if(matched.image){
            dispatch(getPokemonByName(input));
            history.push(`/pokemon/${input}`);
            setInput('');
        } else if(!matched){
            alert('Pokemon name not matched');
            setInput('');
        }
    }

  return (
  
        <form onSubmit={handleSubmit} className={s.form}>
            <input 
                className={s.input}
                type="text" 
                value={input}
                onChange={handleInputChange}
                placeholder="Pokemon name..."
                onClick={()=>  setInput('')}
            />
        </form>
 
  )
}

export default SearchBar;