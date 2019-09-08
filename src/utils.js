

export const getAllPlayers = (state) => {
  return state.gameState.playerIds.map(playerId => state.gameState[playerId])
}

export const getAllPlayersExcept = (state, playerId) => {
  return state.gameState.playerIds.filter(id => id !== playerId).map(playerId => state.gameState[playerId])
}

export const getOtherPlayers = (state) => {
  return state.gameState.playerIds.filter(id => id !== state.playerId).map(playerId => state.gameState[playerId])
}