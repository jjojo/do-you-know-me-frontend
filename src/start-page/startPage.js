import React, { useEffect, useState, useContext } from 'react'
import { State, Socket } from '../store'
import useSocket from 'use-socket.io-client';
import GameScreen from '../game-screen/gameScreen';
import GameController from '../game-controller/gameController';
import {socket} from '../App';


const StartPage = () => {
  const [room, setRoom] = useState('');
  const { state, dispatch } = useContext(State)

  useEffect(() => {
    console.log(socket)

    socket.on('joinedGame', (gameState, playerId) => {
      console.log('Joined1')
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })

    socket.on('error', (error) => {
      alert(error)
    })
  }, [])

  const connectToGame = (roomName) => {
    socket.emit('join', roomName, state.playerId);
  }
  
  return (
    <React.Fragment>
      {state.gameStarted || (state.gameState || {}).room ? 
        <React.Fragment>{state.gameStarted ? <GameScreen></GameScreen> : <GameController></GameController>}</React.Fragment>
      : (<div className="App">
          <header className="App-header">
            <p>
              {/* // <Link to={"/gameScreen"}>Start a Game</Link> */}
              <button onClick={() => dispatch({ type: 'GAME_STARTED', payload: true})}>Start Game</button>
            </p>
            <p>
              Or Join a game <br/>
              <input type="text" onChange={(e) => setRoom(e.target.value)}></input>
              <br/>
              <button onClick={() => connectToGame(room, state)}>
                Join game
              </button>
            </p>
          </header>
        </div>)}
    </React.Fragment>
  );
}

export default StartPage;