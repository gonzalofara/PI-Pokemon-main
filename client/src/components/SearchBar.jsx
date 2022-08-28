import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from "react-router-dom";
import {getPokemonByName} from '../redux/actions/actions';
import s from './SearchBar.module.css';
// import Loading from './Loading';


const SearchBar = () => {

    // const pokeByName = useSelector(state => state.pokemon)
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    let history = useHistory();
    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(input));
        history.push(`/pokemon/${input}`);
        setInput('');
    }

  return (
  
        <form onSubmit={handleSubmit} className={s.form}>
            <input 
                className={s.input}
                type="text" 
                value={input}
                onChange={handleInputChange}
                placeholder="Search..."
                onClick={()=>  setInput('')}
            />
        </form>
 
  )
}

export default SearchBar;