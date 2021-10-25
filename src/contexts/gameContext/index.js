import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export function useGameContext() {
    return useContext(GameContext)
}
export function GameProvider({ children }){
  const [host, setHost]=useState();
  const [players, setPlayers] = useState([]);
  const [gameSettings, setGameSettings] = useState({numberOfQuestions:0, level:"", topic:""});
  const [roomName, setRoomName]=useState("");



return (
    <GameContext.Provider value={{roomName, host, players, gameSettings, setRoomName, setHost, setPlayers, setGameSettings}}>
        { children }
    </GameContext.Provider>
)
}