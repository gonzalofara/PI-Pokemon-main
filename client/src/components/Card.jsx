import React from 'react'
import {Link} from 'react-router-dom';

const Card = ({id, name, types, image}) => {
  return (
    <div>
        <Link to={`/pokemon/${id}`}>
            <img src={image} alt='pokemon-img' />
            <h1>{name}</h1>
            <h3>types: {types.join(', ')}</h3>
        </Link>
    </div>
  )
}

export default Card