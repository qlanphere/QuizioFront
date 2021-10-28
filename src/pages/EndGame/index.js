import React, { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/gameContext";
import { useAuthContext } from "../../contexts/auth";
import { Bar } from 'react-chartjs-2'
const EndGame = () => {

    const { emails, score } = useGameContext()
    const { currentUser } = useAuthContext()
    // const [finalScores, setFinalScores] = useState([])
    // const [userNames, setUserNames] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [patching, setPatching] = useState(true)
    const [retrieving, setRetrieving] = useState(true)
    const [gameScore, setGameScore] = useState([])
    const [gameUsers, setGameUsers] = useState([])

    const filteredEmails = emails.filter((value, index, array) => array.indexOf(value) === index
    );
    const emailString = filteredEmails.join('*')

    let finalScores
    let userNames


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
            let data
            const response = await fetch(`http://localhost:3000/user/${currentUser.email}`, options)
            data = await response.json()
            if(data) {
            setPatching(false)
            }
            console.log(data)
        }

        modify()


    }, [])

    let options2 = {
        method: 'GET',
        headers: {
            authorization: localStorage.getItem("token")
        }
    }

    async function retrieve() {
        let response = await fetch(`http://localhost:3000/user/${emailString}`, options2)
        let scores = await response.json()
        setData(scores)
        setRetrieving(false)
    }
    

    useEffect(() => {
        if (!patching){
        retrieve()
        }
        console.log(patching)
    
    }, [patching])


    useEffect(() => {
        console.log(data)
        finalScores = data.map(user => user.last_score)
        userNames = data.map(user => user.username)
        setGameScore(finalScores)
        setGameUsers(userNames)
    }, [retrieving])

    useEffect(() => {
        setLoading(false)
    }, [userNames])


    return (
        <>

            <div>Game over!</div>

            <p>Final Score: {score}</p>
            <p>{loading ? "Loading" : " "}</p>

            <Bar
                data={{
                    labels: gameUsers,
                    datasets: [
                        {
                            label: 'Games Played',
                            data: gameScore,
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