import React, {useContext, useState, useEffect} from 'react'
import { State } from '../store'
import {socket} from '../App';
import './gameController.scss'
import LeavRoom from '../leave-room/leaveRoom';

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

  return (
    <div className="game-controller">
      <header style={{backgroundColor: (state.gameState[state.playerId] || {}).color || '#fff'}}>
        <h2>
          <span>{state.gameState.name}</span>
          <LeavRoom></LeavRoom>
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
      <main>
        {questions.length > 0
          ? <React.Fragment>
            <h2>For {questions.length > 0 && questions[qIndex].points} points</h2>
            <h1>{questions.length > 0 && questions[qIndex].question}</h1>
          </React.Fragment>
          : <React.Fragment>
            <h1>{(state.gameState[state.playerId] || {}).ready && 'You are ready ⭐️'}</h1>
            <h2>Waiting for ⏳<br/>{state.gameState.players.map(id => {
              return !state.gameState[id].ready && <span>{state.gameState[id].emoji}</span>
            })}</h2>
          </React.Fragment>}
        
      </main>
      <footer>
        {!(state.gameState[state.playerId] || {}).ready && <React.Fragment>
          <button onClick={() => setQIndex((qIndex + 1) % questions.length)}>
            <span role="img" aria-label="reject">❌</span>
          </button>
          <button onClick={() => {
            setQIndex(0)
            pickQuestion(questions[qIndex])
          }}>
            <span role="img" aria-label="reject">✅</span>
          </button>
        </React.Fragment>}
      </footer>
    </div>
  )
}

export default GameController;