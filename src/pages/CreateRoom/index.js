import React, {useState, useContext, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import {io} from 'socket.io-client' 
const socket = io('http://localhost:8080')

const CreateRoom = () => {
    

    

        
        socket.on("connect", () => {
            console.log(`user is connected on ${socket.id}`)
        })
        socket.on('joined', (id, room) => {
            console.log(`my id is ${socket.id}`)
            console.log(`${id} has joined room: ${room}`)
        })
        
    

    

 //const { currentUser } = useContext(useAuthContext)
 
 // ?? currentUser - should be from localStorage or from Auth ??
    
    const {setHost, roomName, setRoomName, players, setPlayers} = useGameContext()

// function updateRoomName(e) {
//     e.preventDefault()
//     let newInput = e.target.value;
//     setRoomName(newInput)
// }


// function submitNewRoom(e) {
//     e.preventDefault()
//    console.log('room name: ', roomName)
//   // setHost(currentUser) 
//   socket.emit('join-room', roomName)
// }

function joinRoom(e) {
    e.preventDefault()
    setRoomName(e.target[0].value)
    console.log(e.target[0].value)
    console.log(roomName)
    socket.emit('join-room', roomName, socket.id)
// setPlayers([..players, currentUser])  

}
    return (

        <div>
            <h2>Welcome</h2>
            <form onSubmit = {joinRoom}>
            <h3>Enter Room Name: <span><input type = "text" ></input></span></h3>
            <span>
                {/* <button  >New Room</button> */}
                <button type = "submit">Join</button></span>
            </form>
        </div>
    )
}

export default CreateRoom
