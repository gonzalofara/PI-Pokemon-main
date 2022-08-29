import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {getAllPokemons, getPokemonTypes, orderByName, orderByAttack, filterByType, resetFilter} from '../redux/actions/actions';
import Card from './Card.jsx';
import Loading from './Loading';
import SearchBar from './SearchBar';
import Pagination from './Pagination'
import s from './Home.module.css'


const Home = () => {

  //estado y acciones
  let allPokemons = useSelector((state) => state.pokemons);
  let allTypes = useSelector((state) => state.types);
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


  //ordenamientos
  const handleByName = (e)=>{
    // e.preventDefault();
    dispatch(orderByName(e.target.value));
    setPage(1);
    history.push('/home');
  }
  const handleByAttack = (e)=>{
    // e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setPage(1);
    history.push('/home');
  }

  //filtrados
  const handleFilterType = (e)=>{
    // e.preventDefault();
    dispatch(filterByType(e.target.value));
    setPage(1);
    history.push('/home');
  }

  //default
  const handleByDefault = (e)=>{
    // e.preventDefault();
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
                  <Link to='/create' className={s.create}></Link>
                  <div className={s.selectContainer}>
                    <select className={s.orderSelect} >
                      <option className={s.orderOption} value="Order by" autoFocus selected disabled>Order By</option>
                      <option className={s.orderOption} value="default" onClick={handleByDefault}>Default</option>
                      <option className={s.orderOption} value="asc" onClick={(e)=>handleByName(e)}>Name ↑</option>
                      <option className={s.orderOption} value="desc" onClick={(e)=>handleByName(e)}>Name ↓</option>
                      <option className={s.orderOption} value="attackAsc" onClick={(e)=>handleByAttack(e)}>Attack ↑</option>
                      <option className={s.orderOption} value="attackDesc" onClick={(e)=>handleByAttack(e)}>Attack ↓</option>
                    </select>
                  <select className={s.orderSelect}>
                      <option defaultValue="Filter by" selected disabled>Filter By</option>
                      {!allTypes.length > 0 ? null : allTypes.map(t=> (
                          <option key={t.id} value={t.name} onClick={(e)=>handleFilterType(e)}>{t.name.charAt(0).toUpperCase() + t.name.substring(1)}</option>
                      ))}
                  </select>
                  <option className={s.resetFilters} value="default" onClick={handleByDefault}>Clear Filter</option>
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
              {/* <button >&lt;</button> */}
                <Pagination showPerPage={showPerPage}  allPokemons={allPokemons.length} pagination={pagination}/>
              {/* <button>&gt;</button> */}
            </div>
    </div>
  )
}

export default Home