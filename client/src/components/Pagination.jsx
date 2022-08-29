import React from 'react'
import s from './Pagination.module.css'


const Pagination = ({showPerPage, allPokemons, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/showPerPage); i++) {  
        pageNumbers.push(i);
    }
  return (
    <div className={s.btnContainer}>
        <button className={s.btn} >&lt;</button>
        {pageNumbers && pageNumbers.map(n => 
            <div key={n} >  
                <button className={s.btn} onClick={()=> pagination(n)}>{n}</button>
            </div>    
            )
        }
        <button className={s.btn}>&gt;</button>
    </div>
  )
}

export default Pagination