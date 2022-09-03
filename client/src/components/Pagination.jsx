import React from 'react'
import s from './Pagination.module.css'


const Pagination = ({showPerPage, allPokemons, pagination, page}) => {

    const pageNumbers = [];
    const total = Math.ceil(allPokemons/showPerPage)
    for (let i = 1; i <= total; i++) {  
        pageNumbers.push(i);
    }

    

    
  return (
    //DEVOLVES / RENDERIZAS TODO EL HTML
    <div className={s.btnContainer}>
        <button className={s.btn} onClick={page > 1 ?  ()=>pagination(page - 1) : null} hidden={page === 1 ? true : false}>&lt;</button>
        {pageNumbers && pageNumbers.map(n => 
                <button key={n} className={page !== n ? s.btn : s.current} onClick={()=> pagination(n)} >{n}</button>
            )
        }
        <button className={s.btn} onClick={page < total ? ()=> pagination(page + 1) : null} hidden={page === total ? true : false} >&gt;</button>
    </div>
  )
}

export default Pagination