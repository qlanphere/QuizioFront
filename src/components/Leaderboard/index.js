import React, {useState, useEffect} from "react";
import PlayerScoreCard from "../PlayerScoreCard";



const Leaderboard = () => {

    const [leaderboard, setLeaderboard] = useState()
    const [error, setError] = useState();

    const url = 'http://localhost:3000/user/leaderboard'

// fetch liderboard data 
async function getLiderboard() {
    try {
        const data = await fetch(url)
        const leaderboard = await data.json();
        setLeaderboard(leaderboard)
    } catch (err) {
        setError(err.message);
    }
}

useEffect(() => { 
   getLiderboard()
   console.log("leaderboard", leaderboard)
},[])


  //const Lines = leaderboard.map( line => line*2)
  //console.log(Lines)
 // const Lines = leaderboard.map( line => <PlayerScoreCard  props={line} />)

 // {leaderboard.map((line,i) => <PlayerScoreCard key={i}  line={line} />)}
    return(

    <div> 
        <h2>Leaderboard</h2>
    
       
    
    </div>

    )
}
export default Leaderboard;