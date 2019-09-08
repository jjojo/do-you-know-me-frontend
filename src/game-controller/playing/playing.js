import React, {useContext, useState} from 'react'
import { State } from '../../store'
import * as utils from '../../utils';
import './playing.scss'
import PickQuestion from './pick-question/pickQuestion';
import { socket } from '../../App';
import AnswerQuestion from './answer-question/answerQuestion';
import CorrectAnswers from './correct-answers/correctAnswers';

const Playing = (props) => {
  const { state, dispatch } = useContext(State)

  const pickableQuestions = () => utils.getOtherPlayers(state)
    .map(player => player.questions
      .filter(q => !q.answered)[0])

  return (<React.Fragment>
    {!state.gameState.activeQuestion
      ? <React.Fragment>
          {state.gameState.turn === state.playerId && pickableQuestions().length > 0
            ? <PickQuestion questions={pickableQuestions()}/>
            : <React.Fragment>
                <h1>⏳<br/>Waiting for <span>{(state.gameState[state.gameState.turn] || {}).emoji} to pick a question</span></h1>
                <footer></footer>
              </React.Fragment>}
        </React.Fragment>
      : <React.Fragment>
          {state.gameState.activeQuestion.question.playerId === state.playerId
            ? <CorrectAnswers/>
            : <AnswerQuestion/>}
        </React.Fragment>}
  </React.Fragment>)
}

export default Playing;