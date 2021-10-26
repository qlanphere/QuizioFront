import React, {useState, useContext, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import {io} from 'socket.io-client' 
const socket = io('http://localhost:8080')

const CreateRoom = () => {

    const [join, setJoin] = useState(true)
    const [create, setCreate] = useState(false)
    
const {currentUser} = useAuthContext()
const {setHost, roomName, setRoomName, players, setPlayers} = useGameContext()

const [message, setMessage] = useState('')
const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
}

function handleJoin () {
    if (create) {
        setJoin(true)
        setCreate(false)
    } else return
}
function handleCreate () {
    if (join) {
        setCreate(true)
        setJoin(false)
    } else return
}
  
        socket.on("connect", () => {
            console.log(`user is connected on ${socket.id}`)
        })
        socket.on('joined', (user, room) => {
            console.log(`my id is ${socket.id}`)
            console.log(`${user} has joined room: ${room}`)
            setMessage(`${user} has joined room: ${roomName}`)
        })



function joinRoom(e) {
    e.preventDefault()
    let room = e.target[0].value
    setRoomName(room)
    console.log(currentUser.name)
    socket.emit('join-room', room, currentUser.name)
// setPlayers([..players, currentUser])  

}
    return (

        <div>
            <h2>Welcome</h2>
            <form onSubmit = {joinRoom}>
            <h3>Enter Room Name: <input type = "text" ></input></h3>
            <span>
                <label for = "join">Join</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}}  onChange = {handleJoin} checked = {join} type = "checkbox" for = "join"></input>
                <label for = "create">Create Room</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}} onChange = {handleCreate} checked = {create} type = "checkbox" for = "create"></input>
                {/* <button  >New Room</button> */}
                <button type = "submit">Submit</button>
                </span>
            </form>
            <div style = {centerStyle}>{message}</div>
        </div>
    )
}

export default CreateRoom
