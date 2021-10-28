import React, { useState, useContext } from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { useHistory} from 'react-router-dom';
import { SocketContext } from '../../contexts/socketContext';





const Lobby = () => {

 
    
    const { currentUser } = useAuthContext()
    const { host, roomName, players, setQuestions, questions, emails, setEmails} = useGameContext()

    const [numberOfGuests, setNumberOfGuests] = useState(0)
    const history = useHistory();
    const socket = useContext(SocketContext)

    if (!currentUser) {
        history.push('/')
    }

    socket.on('joined', (str, number, email) => {
         console.log(`my id is ${socket.id}`)
        // console.log(`${user} has joined room: ${room}`)
        if (str) {displayMessage(str)}
        console.log(email)
        
        setNumberOfGuests(number)  
        
        socket.emit('send-emails', roomName, currentUser.email)
        
        // setEmails(Array.from(new Set(emails)))
    })

    socket.on('emails', (email) => {
        setEmails(prev => [...prev, email])
    })

    socket.on("userLeft", (guests) => {
        console.log(guests)
        setNumberOfGuests(guests)
      });

    socket.on('questions', (questions) => {
        console.log(questions)
        setQuestions(questions)
        history.push(`/game/${roomName}`)

    })

    function displayMessage(str) {
        const div = document.getElementById('messages')
        div.textContent = str //use ref
    }
   
    function handleStartGame(e){
        e.preventDefault()

        if (currentUser.name === host) {
            socket.emit('send-questions', roomName, questions)
        }

        history.push(`/game/${roomName}`)
    }

    const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
}

    return (
        <div id="Lobby">


            <h2>welcome to the room {roomName} </h2>
            <h2>Host is  {host} </h2>
            <h3>Players: {players}</h3>
            <h4> Waiting for players to join..</h4>
            <div>There are {numberOfGuests} Guests in Lobby</div>
            <div id = "messages"style = {centerStyle}></div>

     
          { (host === currentUser.name) ?
            <button id="start-game" onClick={handleStartGame}>Start Game</button>
            : <></>}

        </div>
    )
}

export default Lobby