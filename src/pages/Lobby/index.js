import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 


const Lobby = () =>{


    const {host, roomName, players} = useGameContext()

    return (
        <div id="Lobby">
            <h2>Lobby</h2>
    
            <div id="host"> 
        
            </div>

            <div id="players">
        
        
            </div>
           
        </div>
    )
}

export default  Lobby