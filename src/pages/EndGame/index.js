import React from "react";
import { useGameContext } from "../../contexts/gameContext";
const EndGame = () => {

    const {emails, score} = useGameContext()
    const emailString = emails.join('*')
    console.log(emails)
    const sendScore = {
        game_score: score
    }
    let options = {
        method: 'PATCH',
        
        headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem("token")
        },
        body: JSON.stringify(sendScore),
    }

    const retrieve = async () => {
       const response = await fetch(`http://localhost:3000/user/${emails}`, options)
       const data = await response.json()
       console.log(data)
    }

    retrieve()



    return (
        <>
            <div>Game over!</div>
            <p>Final Score: {score}</p>
        </>
    )
}

export default EndGame