import React from "react";
import { Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <Route exact path = '/' />
      
      <Route exact path = '/home' />
      
      <Route exact path = '/pokemon/' />

      <Route exact path = '/pokemon/:name'/>      

      <Route exact path = '/pokemon/create' />


    </div>
  );
}

export default App;
