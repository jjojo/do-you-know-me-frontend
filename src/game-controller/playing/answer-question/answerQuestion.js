import React, {useContext, useState} from 'react'
import { State } from '../../../store'
import './answerQuestion.scss'
import { socket } from '../../../App';

const AnswerQuestion = (props) => {
  const { state, dispatch } = useContext(State)
  const [answer, setAnswer] = useState(null)

  const submitAnswer = (event) => {
    event.preventDefault()
    socket.emit('Answer', state.gameState.room, answer)
  }

  return (<React.Fragment>
    <main>
      <h1>Time to answer, good luck!</h1>
      <form onSubmit={submitAnswer} id="answerForm">
        <textarea placeholder={'Type your answer here'} onChange={(e) => setAnswer(e.target.value)} />
      </form>
    </main>
    <footer>
      <button type="submit" form="answerForm" value="Submit">Submit Answer</button>
    </footer>
  </React.Fragment>)
}

export default AnswerQuestion;