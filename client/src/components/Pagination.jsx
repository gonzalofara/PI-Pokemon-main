import React from 'react'
import s from './Pagination.module.css'


const Pagination = ({showPerPage, allPokemons, pagination, page}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/showPerPage); i++) {  
        pageNumbers.push(i);
    }

    
  return (
    <div className={s.btnContainer}>

        <button className={s.btn} onClick={page > 1 ? ()=> pagination(page - 1) : null} >&lt;</button>

        {pageNumbers && pageNumbers.map(n => 
             
                <button key={n} className={s.btn} onClick={()=> pagination(n)} >{n}</button>
             
            )
        }
        <button className={s.btn} onClick={page < Math.ceil(allPokemons/showPerPage) ? ()=> pagination(page + 1) : null} >&gt;</button>
        
    </div>
  )
}

export default Pagination