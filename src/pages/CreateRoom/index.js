import React, {useState, useContext, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useHistory } from "react-router-dom";
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext } from '../../contexts/socketContext';


const CreateRoom = () => {



    const [join, setJoin] = useState(true)
    const [create, setCreate] = useState(false)
    
const {currentUser} = useAuthContext()
const {setHost, roomName, setRoomName, players, setPlayers, message, setMessage} = useGameContext()
const history = useHistory();
const socket = useContext(SocketContext)

if (!currentUser) {
    history.push('/')
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


function joinRoom(e) { //would be better to create settings before creating room
    e.preventDefault()
    let room = e.target[0].value
    setRoomName(room)
    //setMessage(`${currentUser.name} has joined room: ${room}`) 
    if (join) {socket.emit('join-room', room, `${currentUser.name} has joined room: ${room}`, currentUser.email)}
    
    join ? history.push(`/lobby/${room}`): history.push(`/settings/${room}`)
    
// setPlayers([..players, currentUser])  
}
    return (

        <div>
            <h2>Welcome</h2>
            <form onSubmit = {joinRoom}>
            <h3>Enter Room Name: <input type = "text" ></input></h3>
            <span>
                <label htmlFor = "join">Join</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}}  onChange = {handleJoin} checked = {join} type = "checkbox" name = "join"></input>
                <label htmlFor = "create">Create Room</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}} onChange = {handleCreate} checked = {create} type = "checkbox" name = "create"></input>
                {/* <button  >New Room</button> */}
                <button type = "submit">Submit</button>
                </span>
            </form>
        </div>
    )
}
export default CreateRoom
