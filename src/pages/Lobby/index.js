import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'


const Lobby = () => {

    const { currentUser } = useAuthContext()
    const { host, roomName, players } = useGameContext()
console.log(host)
    return (
        <div id="Lobby">


            <h2>welcome to the room {roomName} </h2>
            <h2>Host is  {host} </h2>
            <h3>Players: {players}</h3>

        </div>
    )
}

export default Lobby