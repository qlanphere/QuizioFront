import React, {useEffect} from "react";
import { useGameContext } from "../../contexts/gameContext";
import { useAuthContext } from "../../contexts/auth";
const EndGame = () => {

    const {emails, score} = useGameContext()
    const {currentUser} = useAuthContext()


    useEffect(() => {
    const filteredEmails = emails.filter((value, index, array) =>array.indexOf(value) === index
    );
    const emailString = filteredEmails.join('*')
    console.log(score)
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

    const modify = async () => {
       await fetch(`http://localhost:3000/user/${currentUser.email}`, options)
    //    const data = await response.json()
    //    console.log(data)
    }

    modify()

    const retrieve = async () => {
        const data = await fetch(`http://localhost:3000/user/${emailString}`)
        const scores = await data.json()
        console.log(scores)
    }
    retrieve()
}, [])



    return (
        <>
            <div>Game over!</div>
            <p>Final Score: {score}</p>
        </>
    )
}

export default EndGame