import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import {Link, useHistory} from 'react-router-dom';
import {getAllPokemons, getPokemonTypes} from '../redux/actions/actions';
import Card from './Card.jsx';
import Loading from './Loading';
import Pagination from './Pagination'
import NavBar from './NavBar'
import s from './Home.module.css'


const Home = () => {

  //estado y acciones
  let allPokemons = useSelector((state) => state.pokemons);
  let allTypes = useSelector((state) => state.types);
  const dispatch = useDispatch()
  // let history = useHistory();
  //paginación
  const [page, setPage] = useState(1);
  const showPerPage = 12;
  const lastOnPage = page * showPerPage; 
  const firstOnPage = lastOnPage - showPerPage;
  const shownPokemons = allPokemons.slice(firstOnPage, lastOnPage);
  
  function pagination(pageNumber){
    window.scrollTo(0,0)
    setPage(pageNumber)
  }

  //acciones
  useEffect(()=> {
    dispatch(getAllPokemons());
    dispatch(getPokemonTypes());
  }, [dispatch])
  

  return (
    <div className={s.container}>
      
      <div className={s.title_nav}>
        {!shownPokemons.length > 0 ? null : <NavBar allTypes={allTypes} setPage={setPage} shownPokemons={shownPokemons}/>}
      </div>
      
        <div className={s.cardsContainer}>
          {shownPokemons.length > 0  ?  shownPokemons.map(p => 
            (
                <Card 
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  types={p.types}
                  image={p.image} 
                />
            )
          )  : <Loading className={s.loader}/>}
      </div>
         
           {!shownPokemons.length > 0 ? null : 
             <div className={s.pagination}>
                <Pagination showPerPage={showPerPage}  allPokemons={allPokemons.length} pagination={pagination} page={page}/>
            </div>}
          
    </div>
  )
}

export default Home