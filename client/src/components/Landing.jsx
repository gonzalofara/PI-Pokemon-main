import React from 'react';
import {Link} from 'react-router-dom';


const Landing = () => {
  return (
    <div className="divHome">
        LANDING PAGE  
        <Link to='/home'>
          <button>GO</button>
      </Link>
    </div>
  )
}

export default Landing;