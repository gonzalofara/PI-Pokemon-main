import React from 'react';
import {Link} from 'react-router-dom';
import s from './Card.module.css'

const Card = ({id, name, types, image}) => {

  return (
    <div className={s.container}>
        <Link to={`/pokemon/${id}`}>
            <img src={image} alt='pokemon-img' className={s.pokeImage} />
            <h1 className={s.pokeName}>{name.charAt(0).toUpperCase() + name.substring(1)}</h1>
            <h3 className={s.pokeTypes}>{types.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(', ')}</h3>
        </Link>
    </div>
  )
}

export default Card