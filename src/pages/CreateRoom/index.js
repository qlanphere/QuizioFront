import React, {useState, useContext} from 'react'
import { useAuthContext } from '../../contexts/auth'

const CreateRoom = () => {

    //const { currentUser } = useContext(useAuthContext)

    return (

        <div>
            <h2>Welcome</h2>

            <h3>Enter Room Name: <span><input type = "text"></input></span></h3>
            <span>
                <button>New Room</button>
                <button>Join</button></span>
        </div>
    )
}

export default CreateRoom
