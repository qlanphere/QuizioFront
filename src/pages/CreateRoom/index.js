import React, {useState, useContext, useEffect} from 'react'


import { useAuthContext } from '../../contexts/auth'
import { useHistory } from "react-router-dom";
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext } from '../../contexts/socketContext';

import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import undraw_1 from '../../img/undraw_1.png'



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

        <div className="box" >
           <Typography variant="h2" gutterBottom component="div">
       Welcome to Quizio!
      </Typography>
   

      
                <img src = {undraw_1} className="img" ></img>

      


            <form onSubmit = {joinRoom}>
            <Typography variant="h5" gutterBottom component="div">
        Enter Room Name
      </Typography>
                
                <input type = "text" ></input>
            <div className="box">
            <FormGroup> 
                <FormControlLabel
            control={
                <Checkbox checked={join} onChange={handleJoin} name="join" />
            }
            label="Joining your friends?"
          />
            <FormControlLabel
            control={
                <Checkbox checked={create} onChange={handleCreate} name="create" />
            }
            label="or creating a new room?"
          />

             </FormGroup>
            <Button variant="contained">{join? "Join": "Create"}</Button>
            </div>





{/*
            <label htmlFor = "join">Join</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}}  onChange = {handleJoin} checked = {join} type = "checkbox" name = "join"></input>
                <label htmlFor = "create">Create Room</label>
                <input style = {{marginRight: '10px', marginLeft: '10px'}} onChange = {handleCreate} checked = {create} type = "checkbox" name = "create"></input>
                {/* <button  >New Room</button> */}
                
            </form>
        </div>
    )
}
export default CreateRoom
