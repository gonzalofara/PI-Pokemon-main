import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {createPokemon, getPokemonTypes} from '../redux/actions/actions';
import validate from '../validator/validate.js';
import s from './CreateForm.module.css';

const CreateForm = () => {

    const [input, setInput] = useState({});
    const [errors, setErrors] = useState({});

    let types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const history = useHistory();
    
    useEffect(()=> {
        dispatch(getPokemonTypes())   
    }, [dispatch])

    function validate (input) {
        let errors = {};
        if(!input.name){
            errors.name = "Name is required";
        }
        else if(/^[a-zA-Z]+$/.test(input.name) === -1){
            errors.name = "Name is invalid. Only accept letters"
        } 
        else if (!input.type1 && !input.type2){
            errors.type1 = 'At least a Pokemon Type is required'
        }
        else if (/^[0-9]+$/.test(input.attack) === -1){
            errors.attack = 'Attack must be a Number'
        }
        else if (/^[0-9]+$/.test(input.defense) === -1){
            errors.defense = 'Defense must be a Number'
        }
        else if (/^[0-9]+$/.test(input.health) === -1){
            errors.health = 'HP must be a Number'
        }
        else if (/^[0-9]+$/.test(input.height) === -1){
            errors.height = 'Height must be a Number'
        }
        else if (/^[0-9]+$/.test(input.weight) === -1){
            errors.weight = 'Weight must be a Number'
        }

        return errors
    }

    const handleChange = (e) =>{
        setInput({ 
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelectChange1 = (e) =>{
        setInput({ 
            ...input,
            type1: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const handleSelectChange2 = (e) =>{
        setInput({ 
            ...input,
            type2: e.target.value
        });
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!errors.name && !errors.type1 && !errors.health && !errors.attack && !errors.defense && !errors.height && !errors.weight ){
            dispatch(createPokemon(input))
            alert("Pokemon creado correctamente")
            setInput({})
            history.push('/home')
        }
        alert('Check input values')
        
    }

  return (
    <form onSubmit={handleSubmit} className={s.container}>
        <div className={s.input}>
        <h2 className={s.title}>Create Pókemon</h2>
            <div className={s.nameInput}>
                <label>Name</label>
                <input type="text" name="name" required onChange={handleChange}/>
            </div>
                <select className={s.selector}  onChange={handleSelectChange1}>
                    <option value hidden >Pokemon Type</option>
                        {types && types.map(t => 
                                <option key={t.id} value={t.name}>{t.name.charAt(0).toUpperCase() + t.name.substring(1)} </option>
                        )}
                </select>
                <select className={s.selector} onChange={handleSelectChange2}>
                    <option value hidden >Pokemon Type</option>
                        {types && types.filter(t => t.name !== input.type1 ).map(filtered => <option key={filtered.id} value={filtered.name}>{filtered.name.charAt(0).toUpperCase() + filtered.name.substring(1)}</option>)}
                </select>
                <label  className={s.labelImage}>Pokemon Image
                    <input type="file" className={s.image} accept="image/*"/>
                </label>
        <div className={s.inputsContainer}>
                
                <div className={s.labels}>
                <label>HP</label>
                <input type="number" name="health" min="0" max="99" onChange={handleChange}/>
                </div>

                <div className={s.labels}>
                <label>Attack</label>
                <input type="number" name="attack" min="0" max="99" onChange={handleChange}/>
                </div>

                <div className={s.labels}>
                    <label>Defense</label>
                    <input type="number" name="defense" min="0" max="99" onChange={handleChange}/>
                </div>

                <div className={s.labels}>
                    <label>Speed</label>
                    <input type="number" name="speed" min="0" max="99" onChange={handleChange}/>
                </div>
                
                <div className={s.labels}>
                    <label>Height</label>
                    <input type="number" name="height" min="0" max="99" onChange={handleChange}/>
                </div>

                <div className={s.labels}>
                    <label>Weight</label>
                    <input type="number" name="weight" min="0" max="99" onChange={handleChange}/>
            </div> 
            </div>
                <button className={s.btn} type="submit">Create</button>
        </div>

    </form>
  )
}

export default CreateForm