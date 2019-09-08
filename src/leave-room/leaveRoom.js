import React, {useContext, useState} from 'react'
import { State } from '../store'
import './leaveRoom.scss'

const LeavRoom = (props) => {
  const { state, dispatch } = useContext(State)

  const onLeave = () => {
    props.socket.emit('leaveGame', state.gameState.room, state.playerId);
    sessionStorage.removeItem('playerId')
    dispatch({type:'QUIT_GAME'})
  }

  return (
    <div className="leave-room">
      <button onClick={onLeave}>Leave room</button>
    </div>
  )
}

export default LeavRoom;