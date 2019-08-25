import React from 'react'

export const initialState = {
  gameStarted: false,
  joinedGame: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'REPOPULATE_STATE':
      return action.payload;
    case 'QUIT_GAME':
      return initialState;
    case 'SET_PLAYER_ID':
      return {
        ...state,
        playerId: action.payload,
      };
    case 'GAME_STARTED':
      return {
        ...state,
        gameStarted: action.payload,
      };
    case 'JOINED_GAME':
      return {
        ...state,
        joinedGame: action.payload,
      };
    case 'UPDATE_GAME_STATE':
      return {
        ...state,
        gameState: action.payload,
      };
    
    default:
      return state;
  }

}

export const State = React.createContext();
