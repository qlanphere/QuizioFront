import {io} from 'socket.io-client'
import React from 'react'

export const socket = io('https://quizioback.herokuapp.com');
export const SocketContext = React.createContext()