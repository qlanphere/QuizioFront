import React from "react";
import { useGameContext } from "../../contexts/gameContext";
import { useAuthContext } from "../../contexts/auth";
import {Bar} from 'react-chartjs-2'

const EndGame = () => {

    const {emails, score} = useGameContext()
    const {currentUser} = useAuthContext()
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
    const finalScores = retrieve()



    return (
        <>
            <div>Game over!</div>
            <p>Final Score: {score}</p>
            <Bar
            data = {{
                labels: filteredEmails,
                datasets: [
                {
                    label: 'Final Scores',
                    data: finalScores,
                    backgroundColor: ['orange'],
                    borderColor: 'red',
                    borderWidth: 1
                }
                ]
            }}
           options={{
               maintainAspectRatio: true,
            //    scales: {
            //        yAxes: [
            //            {ticks: {
            //                beginAtZero: true,
            //            }}
            //        ]
            //    }
        }}/>
    </>
    )
}

export default EndGame