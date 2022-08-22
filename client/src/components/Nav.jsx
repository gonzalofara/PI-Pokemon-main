import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPokemonByName} from '../redux/actions/actions';


const Nav = () => {

    const pokeByName = useSelector(state => state.pokemon)
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleInputChange = (e) => {
        setName(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getPokemonByName(name))
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name}
                onChange={handleInputChange}
            />
            <button
                type="submit"
            > Search
            </button>
        </form>
    </div>
  )
}

export default Nav