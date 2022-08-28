import React from 'react'
import s from './Pagination.module.css'


const Pagination = ({showPerPage, allPokemons, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/showPerPage); i++) {  
        pageNumbers.push(i);
    }
  return (
    <div className={s.btnContainer}>
        {pageNumbers && pageNumbers.map(n => 
            <div key={n} >  
                <button className={s.btn} onClick={()=> pagination(n)}>{n}</button>
            </div>    
            )
        }
    </div>
  )
}

export default Pagination