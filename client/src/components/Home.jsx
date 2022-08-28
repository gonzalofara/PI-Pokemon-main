import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {getAllPokemons, getPokemonTypes, orderByName, orderByAttack} from '../redux/actions/actions';
import Card from './Card.jsx';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Pagination from './Pagination'
import s from './Home.module.css'


const Home = () => {

  //estado y acciones
  let allPokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch()
  let history = useHistory();
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


  const handleByName = (e)=>{
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPage(1);
    history.push('/home');
  }
  const handleByAttack = (e)=>{
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setPage(1);
    history.push('/home');
  }

  const handleByDefault = (e)=>{
    e.preventDefault();
    dispatch(getAllPokemons());
    setPage(1);
    history.push('/home');
  }
  
  
  return (
    <div className={s.container}>
      
      <div className={s.title_nav}>
        <div className={s.title}></div>
            {!shownPokemons.length > 0 ? null :
              <div className={s.order_search}>
                  <SearchBar />
                  <Link to='/create' className={s.create}>Create Pókemon</Link>
                  <div className={s.orderName}>
                    <select>
                      <option className={s.btn} defaultValue="Order by" disabled>Order By</option>
                      <option className={s.btn} value="all" onClick={handleByDefault}>Default</option>
                      <option className={s.btn} value="asc" onClick={handleByName}>Name ↑</option>
                      <option className={s.btn} value="desc" onClick={handleByName}>Name ↓</option>
                      <option className={s.btn} value="asc" onClick={handleByAttack}>Attack ↑</option>
                      <option className={s.btn} value="desc" onClick={handleByAttack}>Attack ↓</option>
                    </select>
                    
                </div>
              </div>
            }
      </div>
        <div className={s.cardsContainer}>
          {shownPokemons.length > 0  ?  shownPokemons.map(p => 
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
          )  : <Loading />}
      </div>
            <div className={s.pagination}>
              <Pagination showPerPage={showPerPage}  allPokemons={allPokemons.length} pagination={pagination}/>
            </div>
    </div>
  )
}

export default Home