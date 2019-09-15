import React from 'react'
import './choosingQuestions.scss'

const ChoosingQuestions = (props) => {

  return (<React.Fragment>
    <main>
      {props.questions.length > 0 
        ? <React.Fragment>
            <h2>For {props.questions[props.qIndex].points} points</h2>
            <h1>{props.questions[props.qIndex].question}</h1>
        </React.Fragment>
        : <React.Fragment>
          <h1>{props.ready && 'You are ready ⭐️'}</h1>
          <h2>Waiting for ⏳<br/>{props.players.map(player => {
            return !player.ready && <span>{player.emoji}</span>
          })}</h2>
      </React.Fragment>}      
    </main>
    <footer>
      {!props.ready && <React.Fragment>
        <button onClick={() => props.setQIndex((props.qIndex + 1) % props.questions.length)}>
          <span role="img" aria-label="reject">❌</span>
        </button>
        <button onClick={() => {
          props.setQIndex(0)
          props.pickQuestion(props.questions[props.qIndex])
        }}>
          <span role="img" aria-label="accept">✅</span>
        </button>
      </React.Fragment>}
    </footer>
  </React.Fragment>)
}

export default ChoosingQuestions;