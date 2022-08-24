import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import CardDetail from './components/CardDetail.jsx'
import CreateForm from './components/CreateForm.jsx'

function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/pokemon/:id' component={CardDetail} />
          <Route exact path='/pokemon/' component={CardDetail} />
          <Route exact path='/create' component={CreateForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
