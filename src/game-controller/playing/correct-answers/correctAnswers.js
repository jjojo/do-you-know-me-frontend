import React, {useContext, useState} from 'react'
import { State } from '../../../store'
import './correctAnswers.scss'
import { socket } from '../../../App';

const CorrectAnswers = () => {
  const { state, dispatch } = useContext(State)
  const [answer, setAnswer] = useState(null)

  const correctAnswer = (event, bool) => {
    event.preventDefault()
    socket.emit('CorrectedAnswer', state.gameState.room, answer, bool)
  }

  return (<React.Fragment>
    <main>
      <h1>This is your question! Answers will come in soon, stay ready!</h1>
      {state.gameState.activeQuestion.answers.map(item => {
        return(
          <p key={item.answer}>{item.answer}</p>
        )
      })}
    </main>
    <footer>
      <button onClick={(e) => correctAnswer(e, false)}>
        <span role="img" aria-label="reject">❌</span>
      </button>
      <button onClick={(e) => correctAnswer(e, true)}>
        <span role="img" aria-label="accept">✅</span>
      </button>
    </footer>
    
  </React.Fragment>)
}

export default CorrectAnswers;