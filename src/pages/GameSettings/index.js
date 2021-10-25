import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import { useHistory, useParams } from 'react-router-dom';

const GameSettings = () =>{

const {host, roomName, players} = useGameContext()
const history = useHistory();


function handleRoomSettings(){

    // set Settings  and 
   
    // rederect to the lobby
    history.push(`/lobby/${roomName}`)

}
return (
    <div id="settings">
        <h2>welcome to the room {roomName} </h2>
        <h2> choose settings</h2>

        <button onClick={handleRoomSettings}>Submit settings</button>

       
    </div>
)
}

export default GameSettings