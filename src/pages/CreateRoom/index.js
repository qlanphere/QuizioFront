import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import {io} from 'socket.io-client' 
const CreateRoom = () => {
    const socket = io('http://localhost:8080')

    socket.on("connection", () => {
        console.log(`user is connected on ${socket.id}`)
    })

 //const { currentUser } = useContext(useAuthContext)
 
 // ?? currentUser - should be from localStorage or from Auth ??
    
    const {setHost, roomName, setRoomName, players, setPlayers} = useGameContext()

function updateRoomName(e) {
    let newInput = e.target.value;
    setRoomName(newInput)
}

function submitNewRoom(e) {
    e.preventDefault()
   console.log('room name ', roomName)
  // setHost(currentUser) 
}

function joinRoom(e) {
    e.preventDefault()
    
// setPlayers([..players, currentUser])  

}
    return (

        <div>
            <h2>Welcome</h2>

            <h3>Enter Room Name: <span><input type = "text" onChange={updateRoomName}></input></span></h3>
            <span>
                <button onClick={submitNewRoom}  >New Room</button>
                <button onClock={joinRoom}>Join</button></span>
        </div>
    )
}

export default CreateRoom
