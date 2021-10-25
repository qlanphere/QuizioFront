import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import { useHistory, useParams } from 'react-router-dom';


const CreateRoom = () => {

 const { currentUser } = useAuthContext()
 
 const history = useHistory();
    
    const {host, setHost, roomName, setRoomName, players, setPlayers} = useGameContext()

function updateRoomName(e) {
    let newInput = e.target.value;
    setRoomName(newInput)
    
}

function submitNewRoom(e) {
    e.preventDefault()
   console.log('room name ', roomName)
   console.log(currentUser.name)
   console.log("host name1", host)
   setHost(currentUser.name)
   setPlayers([...players, currentUser.name])  
   console.log("room ", roomName, ". host is " , host) 
   history.push(`/settings/${roomName}`)
}

function joinRoom(e) {
    e.preventDefault()
    
    setPlayers([...players, currentUser.name])  
    console.log("players ", players)
    history.push(`/lobby/${roomName}`)
    

}
    return (

        <div>
            <h2>Welcome</h2>

            <h3>Enter Room Name: <span><input type = "text" onChange={updateRoomName}></input></span></h3>
            <span>
                <button onClick={submitNewRoom}  >New Room</button>
                <button onClick={joinRoom}>Join</button></span>
        </div>
    )
}

export default CreateRoom
