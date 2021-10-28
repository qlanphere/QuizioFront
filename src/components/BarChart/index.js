import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2'


const BarChart = () => {

    const [data, setData] = useState([])

    //must be empty array otherwise map not a function

    useEffect(()=> {
        if(!data.length){
            retrieve()
        }
    }, [])

    async function retrieve(){
        const response = await fetch('https://quizioback.herokuapp.com/user/leaderboard')
        const data = await response.json()
        // array for labels (user names)
        // array for scores
        setData((data.length>=5) ? data.slice(0,5): data)
        console.log(data)
        // WANT TO RETRIEVE ONLY TOP FIVE scores 
    }
    
    const userNames = data.map(user => user.username)
    const totalScores = data.map(user => user.total_scores)
    const totalGames = data.map(user => user.total_games)
    console.log(totalGames)
    console.log(totalScores)
    console.log(userNames)
    
    return (
        <>
        <Bar
            data = {{
                labels:userNames,
                datasets: [
                    {
                    label: 'Games Played',
                    data:totalGames,
                    backgroundColor: ['rgb(130, 180, 236,1)'],
                    borderColor: ['rgba(23, 29, 155, 1'],
                    borderWidth: 1
                },
                {
                    label: 'Total Points',
                    data:totalScores,
                    backgroundColor: ['orange'],
                    borderColor: 'red',
                    borderWidth: 1
                }
                ]
            }}
           options={{
               maintainAspectRatio: true,
        }}
           />
        </>
    )
}

export default BarChart
