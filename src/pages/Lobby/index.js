import React, { useState, useContext } from 'react'
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





const Lobby = () => {



    const { currentUser } = useAuthContext()
    const { host, roomName, players, setQuestions, questions, emails, setEmails } = useGameContext()

    const [numberOfGuests, setNumberOfGuests] = useState(0)
    const history = useHistory();
    const socket = useContext(SocketContext)

    if (!currentUser) {
        history.push('/')
    }

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

    function displayMessage(str) {
        const div = document.getElementById('messages')
        div.textContent = str //use ref
    }

    function handleStartGame(e) {
        e.preventDefault()

        if (currentUser.name === host) {
            socket.emit('send-questions', roomName, questions)
        }

        history.push(`/game/${roomName}`)
    }

    const centerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    }

    return (
        <div id="Lobby">
            

                <Card sx={{ minWidth: 275 }}>
                <div className='d-flex'>
                    <div className='col justify-content-center'>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                welcome to room: {roomName}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Waiting for players to join..
                            </Typography>

                        </CardContent>
                        <CardActions className = 'justify-content-center'>
                            {(host === currentUser.name) ?
                                <Button className = 'justify-content-center' variant="contained" id="start-game" onClick={handleStartGame}>Start Game</Button>
                                : <></>}
                        </CardActions>
                    </div>
                    <Card  className = 'justify-content-center col bg-primary'><div style = {{color: 'white'}} className = 'justify-content-center'>Notifications</div>
                        <Card className = "mt-2 mx-2">
                    <div id = "messages" style = {centerStyle}></div>
                    </Card>
                    </Card>
                    </div>
                </Card>

            </div>
             )}




            export default Lobby