import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { useHistory, useParams } from 'react-router-dom';


const Lobby = () => {

    const { currentUser } = useAuthContext()
    const { host, roomName, players } = useGameContext()
    const history = useHistory();
   
    function handleStartGame(e){
        e.preventDefault()
        history.push(`/game/${roomName}`)
    }


    return (
        <div id="Lobby">


            <h2>welcome to the room {roomName} </h2>
            <h2>Host is  {host} </h2>
            <h3>Players: {players}</h3>
            <h4> Waiting for players to join..</h4>

     
          { (host === currentUser.name) ?
            <button id="start-game" onClick={handleStartGame}>Start Game</button>: <></>}

        </div>
    )
}

export default Lobby