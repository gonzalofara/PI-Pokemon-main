import React from 'react'

const Pagination = ({showPerPage, allPokemons, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons/showPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <div>
        {pageNumbers && pageNumbers.map(n => 
            <div key={n}>
                <button onClick={()=> pagination(n)}>{n}</button>
            </div>    
            )
        }
    </div>
  )
}

export default Pagination