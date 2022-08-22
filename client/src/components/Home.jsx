import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllPokemons} from '../redux/actions/actions';
import Card from './Card.jsx';
import Loading from './Loading';
import Nav from './Nav';

const Home = () => {

  
  const allPokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(getAllPokemons());
  }, [dispatch])

  return (
    <div>
      Home
      <Nav />
      {allPokemons.length > 0 ? allPokemons.map(p => 
        (
          <div key={p.id}>
            <Card 
              key={p.id}
              id={p.id}
              name={p.name}
              types={p.types}
              image={p.image} 
            />
          </div>
        )
      ) : <Loading/>}
      

    </div>
  )
}

export default Home