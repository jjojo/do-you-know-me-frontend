import React, { useEffect, useContext} from 'react';
import { State } from '../../store'
import './question.scss';

const Question = (props) => {
  const { state, dispatch } = useContext(State)
  
  return (<React.Fragment>
    {state.gameState.turn === state.playerId
      ? <div className={`question`} 
          style={{backgroundColor: `${props.question.focus && state.gameState[props.question.playerId].color}`}}>
          {props.question.points}
          <span>{state.gameState[props.question.playerId].color.emoji}</span>
        </div>
      : <div className={`
        question 
        ${state.gameState.turn === props.question.playerId && state.gameState.gameStartCountDown < 0 ? 'disabled' : ''} 
        ${props.question.focus && state.playerId !== state.gameState.turn ? 'focused' : ''}`} 
          style={{backgroundColor: `${props.question.focus ? (state.gameState[state.gameState.turn] || {}).color : '#ffffff'}`}}>
          {props.question.points}
          <span>{props.question.focus && state.playerId !== state.gameState.turn ? state.gameState[props.question.focusFrom].emoji : ''}</span>
        </div>}
  </React.Fragment>)
}

export default Question;