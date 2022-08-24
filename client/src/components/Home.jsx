import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {getAllPokemons, getPokemonTypes} from '../redux/actions/actions';
import Card from './Card.jsx';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Pagination from './Pagination'
import s from './Home.module.css'


const Home = () => {

  //estado y acciones
  const allPokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch()
  
  //paginación
  const [page, setPage] = useState(1);
  const showPerPage = 12;
  const lastOnPage = page * showPerPage; 
  const firstOnPage = lastOnPage - showPerPage;
  const shownPokemons = allPokemons.slice(firstOnPage, lastOnPage);
  function pagination(pageNumber){
    return setPage(pageNumber)
  }

  //acciones
  useEffect(()=> {
    dispatch(getAllPokemons());
    dispatch(getPokemonTypes());
  }, [dispatch])

  
  return (
    <div className={s.container}>
      
      <div className={s.title_nav}>
        <div className={s.title}></div>
      </div>
      
        <div className={s.cardsContainer}>
          {shownPokemons.length > 0 ? shownPokemons.map(p => 
            (
              // <div  key={p.id}>
                <Card 
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  types={p.types}
                  image={p.image} 
                />
              // </div>
            )
          ) : <Loading />}
      </div>
              <Pagination showPerPage={showPerPage}  allPokemons={allPokemons.length} pagination={pagination}/>
    </div>
  )
}

export default Home