import React, { useEffect, useContext} from 'react';
import { State } from '../../store'
import * as utils from '../../utils';
import './questionPopUp.scss';
import PlayerEmojiUsername from '../../shared-components/player-emoji-username/playerEmojiUsername';

const QuestionPopUp = () => {
  const { state, dispatch } = useContext(State)

  const rephraseQuestion = (question) => {
    if(question.question.includes('your')) {
      return question.question.replace('your', `${state.gameState[question.playerId].username.charAt(0).toUpperCase() + state.gameState[question.playerId].username.slice(1)}'s`)
    }
    if(question.question.includes('you')) {
      return question.question.replace('you', `${state.gameState[question.playerId].username.charAt(0).toUpperCase() + state.gameState[question.playerId].username.slice(1)}`)
    }
  }
  
  return (<div className={'wrapper'}>
    <div className={'question-pop-up'} style={{backgroundColor: `${state.gameState[state.gameState.activeQuestion.question.playerId].color}`}}>
      <span>{state.gameState[state.gameState.activeQuestion.question.playerId].emoji}</span>
      <h1>
        {rephraseQuestion(state.gameState.activeQuestion.question)}
      </h1>
      <section>
        {utils.getAllPlayersExcept(state, state.gameState.activeQuestion.question.playerId).map((player, i) => {
          return (<React.Fragment key={i + 'nameContainer'}>
            <PlayerEmojiUsername player={player} key={i + 'name'}/>
          </React.Fragment>)
        })}
      </section>
    </div>
  </div>)
}

export default QuestionPopUp;