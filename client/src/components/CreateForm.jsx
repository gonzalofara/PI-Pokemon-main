import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {createPokemon, getPokemonTypes} from '../redux/actions/actions';


const CreateForm = () => {

    const [input, setInput] = useState({});
    let types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=> {
        dispatch(getPokemonTypes())   
    }, [dispatch])

    const handleChange = (e) =>{
        setInput({ 
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSelectChange = (e) =>{
        setInput({
            ...input,
            types: [...types, e.target.value]
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(createPokemon(input))
        alert("Pokemon creado correctamente")
        setInput({})
        history.push('/home')
    }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Create Pokemon</h2>
            <label>Name</label>
            <input type="text" name="name" required onChange={handleChange}/>

            <select onChange={handleSelectChange}>
                <option defaultValue >Pokemon Type</option>
                    {types && types.map(t => 
                            <option key={t.id} value={t.name}>{t.name}</option>
                    )}
            </select>

            <label>HP</label>
            <input type="number" name="health" min="0" max="99" onChange={handleChange}/>

            <label>Attack</label>
            <input type="number" name="attack" min="0" max="99" onChange={handleChange}/>
            
            <label>Defense</label>
            <input type="number" name="defense" min="0" max="99" onChange={handleChange}/>
            
            <label>Speed</label>
            <input type="number" name="speed" min="0" max="99" onChange={handleChange}/>

            <label>Height</label>
            <input type="number" name="height" min="0" max="99" onChange={handleChange}/>
            
            <label>Weight</label>
            <input type="number" name="weight" min="0" max="99" onChange={handleChange}/>

            <button type="submit">Create</button>


    </form>
  )
}

export default CreateForm