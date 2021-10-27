import React, {useState, useEffect, useContext} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import { useHistory, useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/socketContext';

const GameSettings = () =>{

const {host, roomName, gameSettings, setGameSettings, questions, setQuestions, setHost} = useGameContext()
const {currentUser} = useAuthContext();
const socket = useContext(SocketContext)
const history = useHistory();

// -------   for testing  fetch
// const topic = 23  // should be a number
// const numberOfQuestions=4
// const level="medium"
// -----

const trivia_categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},
{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},
{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},
{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},
{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},
{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},
{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},
{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},
{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

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
  
  function handleSubmit(e) {
    e.preventDefault()
    let category = e.target[0].value
    let topic = trivia_categories.filter(e => e.name === category)
    console.log(topic)
    let numberOfQuestions = e.target[1].value
    let difficulty = e.target[2].value

    setGameSettings({topic: topic[0].id, numberOfQuestions: numberOfQuestions, level: difficulty})
    setHost(currentUser.name)
    fetchQuiz(numberOfQuestions, difficulty, topic[0].id)

    history.push(`/lobby/${roomName}`)
  }


return (
    <div id="settings">
        <h2>welcome to  {roomName} </h2>
        <h2> choose settings: </h2>
        <form onSubmit = {handleSubmit}>
          <select id = "cateogry"name = "categories">
            <option value = "General Knowledge">General Knowledge</option>
            <option value = "Entertainment: Film">Entertainment: Film</option>
            <option value = "Entertainment: Music">Entertainment: Music</option>
            <option value = "Entertainment: Television">Entertainement: Television</option>
            <option value = "Entertainemnt: Video Games">Entertainemnt: Video Games</option>
            <option value = "Science & Nature">Science & Nature</option>
            <option value = "Science: Computers">Science: Computers</option>
            <option value = "Sports">Sports</option>
            <option value = "Geography">Geography</option>
            <option value = "History">History</option>
            <option value = "Politics">Politics</option>
            <option value = "Science: Gadgets">Science: Gadgets</option>
          </select>
          <input type = "text" placeholder = "number of questions"></input>

          <select>
            <option value = "easy">Easy</option>
            <option value = "medium">Medium</option>
            <option value = "hard">Hard</option>
          </select>
          <button type = "submit">Submit</button>
          

        </form>

    </div>
)
}

export default GameSettings