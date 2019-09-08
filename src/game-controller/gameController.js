import React, {useContext, useState, useEffect} from 'react'
import { State } from '../store'
import {socket} from '../App';
import './gameController.scss'
import LeavRoom from '../leave-room/leaveRoom';
import ChoosingQuestions from './chosing-questions/choosingQuestions';
import Playing from './playing/playing';

const GameController = () => {
  const [ username, setUsername ] = useState(null)
  const [ qIndex, setQIndex ] = useState(0)
  const [ questions, setQuestions ] = useState([])
  const { state, dispatch } = useContext(State)

  useEffect(() => {
    socket.emit('join', state.gameState.room, state.playerId);

    socket.on('joinedGame', (gameState, playerId) => {
      console.log('Joined1')
      dispatch({type: 'SET_PLAYER_ID', payload: playerId})
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })
    
    socket.on('pickQuestions', (questions) => {
      console.log('QUestions need picking:', questions)
      setQuestions(questions);
    })

    socket.on('gameUpdate', (gameState) => {
      console.log('GAME STATE UPDATED: ', gameState)
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })
  }, [])

  const sendUsername = (username) => {
    console.log(username)
    socket.emit('setUsername', state.gameState.room, state.playerId, username)
  }

  const pickQuestion = (question) => {
    socket.emit('acceptedQuestion', question)
  }

  const getPlayers = () => {
    return state.gameState.playerIds.map(playerId => state.gameState[playerId])
  }

  return (
    <div className="game-controller">
      <header style={{backgroundColor: (state.gameState[state.playerId] || {}).color || '#fff'}}>
        <h2>
          <span>{state.gameState.name}</span>
          <LeavRoom socket={socket}></LeavRoom>
          <span>
            Room: {state.gameState.room}
          </span>
        </h2>
        {state.gameState[state.playerId] && <React.Fragment>
          <span>
            {state.gameState[state.playerId].emoji}
            <input 
              type="text" 
              onChange={(e) => sendUsername(e.target.value)} 
              placeholder={state.gameState[state.playerId].username || 'Username'}
              maxLength="20"
              autoFocus/>
          </span>
        </React.Fragment>}
      </header>
      { !state.gameState.gameStarted
        ? <ChoosingQuestions 
            questions={questions} 
            qIndex={qIndex} 
            ready={(state.gameState[state.playerId] || {}).ready} 
            players={getPlayers()}
            setQIndex={setQIndex}
            pickQuestion={pickQuestion}/>
        : <Playing/>
      }
    </div>
  )
}

export default GameController;