import React, {useReducer, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import StartPage from './start-page/startPage';
import { 
  State, 
  initialState,
  reducer,
} from './store'

export const socket = new WebSocket('ws://localhost:3000');


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (sessionStorage.getItem('state')) {
      dispatch({type: 'REPOPULATE_STATE', payload: JSON.parse(sessionStorage.getItem('state'))})
    }
    socket.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      dispatch({type: 'UPDATE_GAME_STATE', payload: JSON.parse(event.data)})
    };    
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
