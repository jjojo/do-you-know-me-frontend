import React, {useReducer, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import StartPage from './start-page/startPage';
import { 
  State, 
  initialState,
  reducer,
} from './store'
import * as io from 'socket.io-client'

export const socket = io('http://192.168.1.48:3000');

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (sessionStorage.getItem('state')) {
      dispatch({type: 'REPOPULATE_STATE', payload: JSON.parse(sessionStorage.getItem('state'))})
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('state', JSON.stringify(state))
    console.log('State changed 🔥: ', state)
  }, [state]);

  


  return (
    <State.Provider value={{ state, dispatch }}>
      <Router>
          <Route exact path="/" component={StartPage} />
      </Router>
    </State.Provider>
  );
}

export default App;
