import React, {useContext, useState, useEffect} from 'react'
import { State } from '../../../store'
import './pickQuestion.scss'
import Question from '../../../game-screen/question/question';
import { socket } from '../../../App';

const PickQuestion = (props) => {
  const { state, dispatch } = useContext(State)
  const [ qIndex, setQIndex ] = useState(0)

  useEffect(() => {
    socket.emit('browsingQuestion', state.gameState.room, props.questions[qIndex])
  }, [qIndex])

  const getPlayerFromQuestion = (question) => question && state.gameState[question.playerId]

  const pickQuestion = () => {
    socket.emit('questionPicked', state.gameState.room, props.questions[qIndex])
  }

  return (<React.Fragment>
    <main>
      <h1>Your turn to pick a question!</h1>
      <button onClick={() => setQIndex((qIndex - 1) < 0 ? ((qIndex - 1) % props.questions.length) + props.questions.length : ((qIndex - 1) % props.questions.length))}>{'<'}</button>
      {getPlayerFromQuestion(props.questions[qIndex]).emoji}
      <Question question={props.questions[qIndex]} player={getPlayerFromQuestion(props.questions[qIndex])}/>
      <button onClick={() => setQIndex((qIndex + 1) % props.questions.length)}>{'>'}</button>
    </main>
    <footer>
      <button onClick={pickQuestion}>
        <span role="img" aria-label="reject">✅</span>
      </button>
    </footer>
  </React.Fragment>)
}

export default PickQuestion;