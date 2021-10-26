import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import { useHistory, useParams } from 'react-router-dom';

const GameSettings = () =>{

const {host, roomName, gameSettings, setGameSettings, questions, setQuestions} = useGameContext()
const history = useHistory();

// -------   for testing  fetch
const topic = 23  // should be a number
const numberOfQuestions=4
const level="medium"
// -----

async function fetchQuiz(numberOfQuestions, level, topic) {
  try {
    const result = await fetch(
      //  `https://api.trivia.willfry.co.uk/questions?categories=${topic}&limit=${numberOfQuestions}`)
      
      `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${topic}&difficulty=${level}&type=multiple&encode=url3986`)
      const questions = await result.json();
      console.log("questions " ,questions.results)
      setQuestions(questions.results) 
      
    } catch (err) {
      console.warn(err.message);
    }
  }
  
  
  
  function handleRoomSettings(){
    
    // set Settings  
    setGameSettings({numberOfQuestions: numberOfQuestions, level: level, topic: topic})
    
    // fetch questions ?? should it be here?
    
    fetchQuiz(numberOfQuestions, level, topic)
    
    // rederect to the lobby
history.push(`/lobby/${roomName}`)

}
return (
    <div id="settings">
        <h2>welcome to  {roomName} </h2>
        <h2> choose settings: </h2>

    

        <button onClick={handleRoomSettings}>Submit settings</button>

       
    </div>
)
}

export default GameSettings