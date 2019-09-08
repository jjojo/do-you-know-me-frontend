import React, { useEffect, useContext, useState} from 'react';
import { State } from '../store'
import {socket} from '../App';
import LeavRoom from '../leave-room/leaveRoom';
import './gameScreen.scss';
import Question from './question/question';
import QuestionPopUp from './question-pop-up/questionPopUp';
import PlayerEmojiUsername from '../shared-components/player-emoji-username/playerEmojiUsername';

const GameScreen = () => {
  const { state, dispatch } = useContext(State)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    createGame((state.gameState || {}).room)
    socket.on('gameCreated', (gameState) => {
      console.log('GAME CREATED: ', gameState)
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })

    socket.on('gameStarted', (gameState) => {
      console.log('GAME STARTED: ', gameState)
      setStarted(gameState.gameStarted)
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })

    socket.on('gameUpdate', (gameState) => {
      console.log('GAME STATE UPDATED: ', gameState)
      dispatch({type: 'UPDATE_GAME_STATE', payload: gameState})
    })
  }, [])

  const fullScreen = () => {
    document.getElementsByClassName("game-screen").requestFullscreen();
  }

  const createGame = (room) => {
    socket.emit('createGame', room);
  }

  const getPlayers = () => {
    return state.gameState.playerIds.map(playerId => state.gameState[playerId])
  }
  
  return (<React.Fragment>{ state.gameState &&
    <div className={"game-screen"}>
      {started && state.gameState.gameStartCountDown >= 0 &&
        <game-count-down>
          {state.gameState.gameStartCountDown === 0 ? 'START' : state.gameState.gameStartCountDown}
        </game-count-down>}
      <header>
        <h1>
          {state.gameState.name || 'Game room loading'} 
          <LeavRoom socket={socket}></LeavRoom>
        </h1>
        <h3>Room number: {state.gameState.room}</h3>
        <button onClick={() => fullScreen()}>fullscreen</button>
      </header>
      <main>
        { state.gameState.activeQuestion && <QuestionPopUp/>}
        {state.gameState && getPlayers().map((player) => {
          return player && (
            <section style={{backgroundColor: player.color}} key={player.color}>
              <div>
                {player.questions.map((question, i) => {
                  return <Question question={question} player={player} key={i}></Question>
                })}
              </div>
              <PlayerEmojiUsername player={player}/>
            </section>
          )
        })}
      </main>
      <pre>
        {JSON.stringify(state.gameState, null, "  ")}
      </pre>
    </div>
  }</React.Fragment>)
}

export default GameScreen;