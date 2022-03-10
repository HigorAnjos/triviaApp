import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Configuration from './pages/Configuration';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Trivia from './pages/Trivia';
import FeedBack from './pages/FeedBack';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/Trivia" component={ Trivia } />
        <Route path="/Ranking" component={ Ranking } />
        <Route path="/Configuration" component={ Configuration } />
        <Route path="/feedback" component={ FeedBack } />
      </Switch>
    </div>
  );
}
