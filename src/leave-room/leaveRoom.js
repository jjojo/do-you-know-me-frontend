import React, {useContext, useState} from 'react'
import { State } from '../store'
import './leaveRoom.scss'

const LeavRoom = () => {
  const { state, dispatch } = useContext(State)

  return (
    <div className="leave-room">
      <button onClick={() => dispatch({type:'QUIT_GAME'})}>Leave room</button>
    </div>
  )
}

export default LeavRoom;