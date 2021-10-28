import React from "react";
import { useGameContext } from "../../contexts/gameContext";
import { useAuthContext } from "../../contexts/auth";
const EndGame = () => {

    const {emails, score} = useGameContext()
    const {currentUser} = useAuthContext()
    console.log(emails)
    const filteredEmails = emails.filter((value, index, array) =>array.indexOf(value) === index
    );
    const emailString = filteredEmails.join('*')
    console.log(emailString)
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
       const response = await fetch(`http://localhost:3000/user/${currentUser.email}`, options)
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