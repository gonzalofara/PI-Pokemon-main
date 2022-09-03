import React from 'react'
import SearchBar from './SearchBar';
import { useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {getAllPokemons, orderByName, orderByAttack, filterByType, filterByCreated} from '../redux/actions/actions';
import title from '../resources/pokeball-home.png' 
import s from './NavBar.module.css'



const NavBar = ({setPage, allTypes, shownPokemons}) => {

    const dispatch = useDispatch()
    let history = useHistory();
    
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
    dispatch(filterByType(e.target.value));
    setPage(1);
    history.push('/home');
  }
  const handleByCreated = (e)=>{
    // e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setPage(1);
    history.push('/home');
  }
 //default
 const handleByDefault = ()=>{
    dispatch(getAllPokemons());
    setPage(1);
    history.push('/home')
  }


  
  return (
     
        <div className={s.order_search}>     
          {/* <Link to='/create' className={s.create}></Link> */}
            <div className={s.selectContainer}>
              <select className={s.orderSelect} >
                <option className={s.orderOption} value="" hidden>Order By</option>
                <option className={s.orderOption} value="default" onClick={()=> handleByDefault()}>Default</option>
                <option className={s.orderOption} value="asc" onClick={(e)=>handleByName(e)}>Name ↑</option>
                <option className={s.orderOption} value="desc" onClick={(e)=>handleByName(e)}>Name ↓</option>
                <option className={s.orderOption} value="attackAsc" onClick={(e)=>handleByAttack(e)}>Attack ↑</option>
                 <option className={s.orderOption} value="attackDesc" onClick={(e)=>handleByAttack(e)}>Attack ↓</option>
              </select>
                  
                <select className={s.orderSelect}  >
                  <option hidden>Types</option>
                    {!allTypes.length > 0 ? null : allTypes.map(t=> (
                      <option key={t.id} value={t.name} onClick={(e)=>handleFilterType(e)}>{t.name.charAt(0).toUpperCase() + t.name.substring(1)}</option>
                      ))}
                </select>
                  
                <select className={s.orderSelect}  >
                  <option className={s.orderOption} disabled={true} >Filter By</option>
                  <option className={s.orderOption} value="created" onClick={handleByCreated}>Created</option>
                  <option className={s.orderOption} value="api" onClick={handleByCreated}>Pokemons</option>
                </select>
                  
                  <option className={s.resetFilters} value="default" onClick={()=> handleByDefault()}>Clear Filters</option>
            </div>
              <Link to='/create'><img className={s.title} src={title} alt='title'></img></Link>
            <SearchBar /> 
        </div>

  )
}

export default NavBar