import React from 'react';
import {Link} from 'react-router-dom';
import s from './Card.module.css'

const Card = ({id, name, types, image}) => {

  return (
    <div className={s.container}>
       <div className={s.card}>
          <div className={s.imgBx}>
            <img src={image} alt='pokemon-img'  />
          </div>
          <div className={s.contentBx}>
            <h2>{name.charAt(0).toUpperCase() + name.substring(1)}</h2>
                <h3 className={s.types}>{types.map(t=> t.charAt(0).toUpperCase() + t.substring(1)).join(' - ')}</h3>
            <a href={`/pokemon/${id}`} >+</a>
          </div>
      </div>
    </div>
  )
}

export default Card