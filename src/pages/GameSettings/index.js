import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 

const GameSettings = () =>{

const {host, roomName, players} = useGameContext()

return (
    <div id="settings">
        <h2>welcome to the room {roomName} </h2>

       
    </div>
)
}

export default GameSettings