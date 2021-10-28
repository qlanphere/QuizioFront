import React, { useState, useContext, useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { useHistory } from 'react-router-dom';
import { SocketContext } from '../../contexts/socketContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import book from '../book.gif'





const Lobby = () => {



    const { currentUser } = useAuthContext()
    const { host, roomName, players, setQuestions, questions, emails, setEmails } = useGameContext()

    const [numberOfGuests, setNumberOfGuests] = useState(0)
    const history = useHistory();
    const socket = useContext(SocketContext)
    const centerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    }

    if (!currentUser) {
        history.push('/')
    }
    useEffect(() => {

        socket.on('joined', (str, number, email) => {
            // console.log(`my id is ${socket.id}`)
            // console.log(`${user} has joined room: ${room}`)
            if (str) { displayMessage(str) }
            //console.log(email)
    
            setNumberOfGuests(number)
    
            socket.emit('send-emails', roomName, currentUser.email)
    
            // setEmails(Array.from(new Set(emails)))
        })
    
        socket.on('emails', (email) => {
            setEmails(prev => [...prev, email])
        })
    
        socket.on("userLeft", (guests) => {
            //console.log(guests)
            setNumberOfGuests(guests)
        });
    
        socket.on('questions', (questions) => {
            console.log(questions)
            setQuestions(questions)
            history.push(`/game/${roomName}`)
    
        })

    }, [])

    

    function displayMessage(str) {
        const div = document.getElementById('messages')
        let message = document.createElement('div')
        message.classList.add('centerStyle')
        message.textContent = str
        div.appendChild(message)
    }

    function handleStartGame(e) {
        e.preventDefault()

        if (currentUser.name === host) {
            socket.emit('send-questions', roomName, questions)
        }

        history.push(`/game/${roomName}`)
    }



    return (
        <div id="Lobby">
            

                <Card  className = 'justify-content-center'sx={{ minWidth: 275 }} style = {{marginTop: '100px'}}>
                <div className='d-flex align-items'>
                    <div className='col justify-content-center'>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                welcome to room: {roomName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Waiting for players to join..
                            </Typography>
                            <img style = {{width: 'auto', height: 'auto', maxWidth: '100%'}} src = {book}/>
                        </CardContent>
                        <CardActions className = 'justify-content-center'>
                            {(host === currentUser.name) ?
                                <Button className = 'justify-content-center' variant="contained" id="start-game" onClick={handleStartGame}>Start Game</Button>
                                : <></>}
                        </CardActions>
                    </div>
                    <Card  className = 'justify-content-center col bg-primary' style = {{paddingBottom: '1px'}} ><div style = {{color: 'white'}} className = 'justify-content-center'>Notifications</div>
                        <Card id = "messages" className = "mt-2 mx-2">
                
                    </Card>
                    </Card>
                    </div>
                </Card>

            </div>
             )}




            export default Lobby