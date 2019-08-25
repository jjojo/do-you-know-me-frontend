import React, { useEffect, useContext} from 'react';
import { State } from '../../store'
import './question.scss';

const Question = (props) => {
  const { state, dispatch } = useContext(State)
  
  return (
    <div className={"question"}>
      {props.question.points}
    </div>
  )
}

export default Question;