import React, {useState, useEffect} from "react";
import PlayerScoreCard from "../PlayerScoreCard";



const Leaderboard = () => {
    const [data, setData] = useState([])

    //must be empty array otherwise map not a function

    useEffect(()=> {
        if(!data.length){
            retrieve()
        }
    }, [])

    async function retrieve(){
        const response = await fetch('http://localhost:3000/user/leaderboard')
        const data = await response.json() 
        setData(data)
        console.log(data)
    
    }
    
    const userNames = data.map(user => user.username)
    const totalScores = data.map(user => user.total_scores)
    const totalGames = data.map(user => user.total_games)
    console.log(totalGames)
    console.log(totalScores)
    console.log(userNames)
    


  //const Lines = leaderboard.map( line => line*2)
  //console.log(Lines)
   const lines = data.map( (line,i) => <p key={i} >{i+1}   {line.username}   {line.total_scores}</p>)

 // {leaderboard.map((line,i) => <PlayerScoreCard key={i}  line={line} />)}
    return(

    <div> 
        <h2>Leaderboard</h2>
        {lines}
    
       
    
    </div>

    )
}
export default Leaderboard;