import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export function useGameContext() {
    return useContext(GameContext)
}
export function GameProvider({ children }){
  const [host, setHost]=useState("");
  const [players, setPlayers] = useState([]);
  const [gameSettings, setGameSettings] = useState({numberOfQuestions:5, level:"easy", topic:""});
  const [roomName, setRoomName]=useState("");
  const [questions, setQuestions]=useState([]);
  const [message, setMessage] = useState('')



return (
    <GameContext.Provider value={{roomName, host, players, gameSettings, questions,message, setRoomName, setHost, setPlayers, setGameSettings, setQuestions, setMessage}}>
        { children }
    </GameContext.Provider>
)
}