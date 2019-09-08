import React from "react";
import './playerEmojiUsername.scss'

const PlayerEmojiUsername = (props) => {
  return (<p style={{color: `${props.textColor}`}}>
    <span>{props.player.emoji}</span>
    {props.player.username}
  </p>)
}

export default PlayerEmojiUsername;