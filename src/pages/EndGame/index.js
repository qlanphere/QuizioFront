import React, {useEffect, useState} from "react";
import { useGameContext } from "../../contexts/gameContext";
import { useAuthContext } from "../../contexts/auth";
import {Bar} from 'react-chartjs-2'
const EndGame = () => {

    const {emails, score} = useGameContext()
    const {currentUser} = useAuthContext()
    // const [finalScores, setFinalScores] = useState([])
    // const [userNames, setUserNames] = useState([])
    const [data, setData] = useState([])

    const filteredEmails = emails.filter((value, index, array) =>array.indexOf(value) === index
    );
    const emailString = filteredEmails.join('*')


    useEffect(() => {
    
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


    retrieve()

    

}, [])

let options2 = {
    headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem("token")
    }
}

async function retrieve () {
    let response = await fetch(`http://localhost:3000/user/${emailString}`, options2)
    let scores = await response.json()
    setData(scores)
    // let gameScores = gameUsers.map(user => user.last_score)
    // let roomUsers = gameUsers.map(user => user.username)

    // setFinalScores(gameScores)
    // setUserNames(roomUsers)
    //return scores
}
console.log(data)
let finalScores =  data.map(user => user.last_score)
let userNames = data.map(user => user.username)



    return (
        <>


            <div>Game over!</div>

            <p>Final Score: {score}</p>

            <Bar
            data = {{
                labels:userNames,
                datasets: [
                    {
                    label: 'Games Played',
                    data:finalScores,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1'],
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
        }} />

        </>
    )
}

export default EndGame