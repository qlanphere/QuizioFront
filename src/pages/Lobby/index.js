import React, { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { useHistory, useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/socketContext';





const Lobby = () => {

    
    const { currentUser } = useAuthContext()
    const { host, roomName, players} = useGameContext()
    const history = useHistory();
    const socket = useContext(SocketContext)

    // socket.on('connect', function() {   //  'connect' event is received on client on every connection start.
    //     console.log(socket.id)
    //     socket.emit('join', currentUser.name);  //  where 'user' is your object containing email.
    // })

    socket.on('joined', (str) => {
         console.log(`my id is ${socket.id}`)
        // console.log(`${user} has joined room: ${room}`)
        displayMessage(str)
    })

    function displayMessage(str) {
        const div = document.getElementById('messages')
        div.textContent = str //use ref
    }
   
    function handleStartGame(e){
        e.preventDefault()
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
            <div id = "messages"style = {centerStyle}></div>

     
          {/* { (host === currentUser.name) ? */}
            <button id="start-game" onClick={handleStartGame}>Start Game</button>
            {/* : <></>} */}

        </div>
    )
}

export default Lobby