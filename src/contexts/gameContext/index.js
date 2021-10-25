import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export function useGame() {
    return useContext(GameContext)
}
export function GameProvider({ children }){
  const [host, setHost]=useState();
  const [players, setPlayers] = useState("");



return (
    <GameContext.Provider value={roomName, host, playersList, gameSettings}>
        { children }
    </GameContext.Provider>
)
}