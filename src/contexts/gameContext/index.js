import React, { useState, useContext } from 'react';

const GameContext = React.createContext();

export function GameProvider({ children }) {
    const [host, setHost] = useState("");
    const [players, setPlayers] = useState([]);
    const [gameSettings, setGameSettings] = useState({ numberOfQuestions: 5, level: "easy", topic: "" });
    const [roomName, setRoomName] = useState("");
    const [questions, setQuestions] = useState([]);
    const [message, setMessage] = useState('')
    const [emails, setEmails] = useState([])
    const [score, setScore] = useState(0)
    
    
    
    return (
        <GameContext.Provider value={{score, setScore, roomName, host, players, gameSettings, questions, message, emails, setRoomName, setHost, setPlayers, setGameSettings, setQuestions, setMessage, setEmails}}>
        { children }
    </GameContext.Provider>
)
}
export function useGameContext() {
    return useContext(GameContext)
}