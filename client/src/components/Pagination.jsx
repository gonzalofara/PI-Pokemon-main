import React from 'react'
import s from './Pagination.module.css'


const Pagination = ({showPerPage, allPokemons, pagination, page}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/showPerPage); i++) {  
        pageNumbers.push(i);
    }

    
  return (
    <div className={s.btnContainer}>

        <a className={s.btn} onClick={page > 1 ? ()=> pagination(page - 1) : null} href="#top">&lt;</a>

        {pageNumbers && pageNumbers.map(n => 
             
                <a key={n} className={s.btn} onClick={()=> pagination(n)} href="#top">{n}</a>
             
            )
        }
        <a className={s.btn} onClick={page < Math.ceil(allPokemons/showPerPage) ? ()=> pagination(page + 1) : null} href="#top">&gt;</a>
        
    </div>
  )
}

export default Pagination