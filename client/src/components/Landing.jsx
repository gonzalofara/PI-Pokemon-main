import React from 'react';
import {Link} from 'react-router-dom';
import s from './Landing.module.css'
import pokemon from '../resources/pokemon.png';

const Landing = () => {
  return (
    <div className={s.divHome}>
      <Link to='/home' className={s.link}>
        <div className={s.divTitle}>
          {/* <img src={pokemon} alt="title-img" className={s.image} /> */}
        </div>
      </Link>
    </div>
    
  )
}

export default Landing;