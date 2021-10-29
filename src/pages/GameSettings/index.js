import React, {useState, useEffect, useContext} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import { useHistory, useParams } from 'react-router-dom';
import { SocketContext } from '../../contexts/socketContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import  './GameSettings.css'


import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

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


//  to shuffle the  answers array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


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
      questions.results.map(question => question.allOptions = shuffle([...question.incorrect_answers,question.correct_answer]))
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
    socket.emit('join-room', roomName, `${currentUser.name} has joined room: ${roomName}`, currentUser.email)

    history.push(`/lobby/${roomName}`)
  }


return (
    <div id="settings" className="box">

<Typography variant="h3" gutterBottom component="div" color="primary">
Welcome to the room {roomName}
      </Typography>
     
      <Typography variant="h5" gutterBottom component="div" color="primary">
      Choose settings:
      </Typography>
        
        <form onSubmit = {handleSubmit} className="box">

         <div className="dropdown box">

          <select id = "cateogry" name = "categories">
          <option value="" disabled selected>Select category</option>
            <option value = "General Knowledge">General Knowledge</option>
            <option value = "Entertainment: Film">Entertainment: Film</option>
            <option value = "Entertainment: Music">Entertainment: Music</option>
            <option value = "Entertainment: Television">Entertainment: Television</option>
            <option value = "Entertainment: Video Games">Entertainment: Video Games</option>
            <option value = "Science & Nature">Science & Nature</option>
            <option value = "Science: Computers">Science: Computers</option>
            <option value = "Sports">Sports</option>
            <option value = "Geography">Geography</option>
            <option value = "History">History</option>
            <option value = "Politics">Politics</option>
            <option value = "Science: Gadgets">Science: Gadgets</option>
          </select>
         </div>
      
         {/*}
          <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="categoryLabel">Category</InputLabel>
        <Select
           labelId="categoryLabel"
           id="cateogry"
          label="Category">
           <MenuItem value="General Knowledge">General Knowledge</MenuItem>
           <MenuItem value="Entertainment: Film">Entertainment: Film</MenuItem>
           <MenuItem value="Entertainment: Music">Entertainment: Music</MenuItem>
           <MenuItem value="Entertainment: Television">Entertainment: Television</MenuItem>
           <MenuItem value="Entertainment: Video Games">Entertainment: Video Games</MenuItem>
           <MenuItem value="Science & Nature">Science & Nature</MenuItem>
           <MenuItem value="Science: Computers">Science: Computers</MenuItem>
           <MenuItem value="Sports">Sports"</MenuItem>
           <MenuItem value="Geography">Geography</MenuItem>
           <MenuItem value="History">History</MenuItem>
           <MenuItem value="Politics">Politics</MenuItem>
           <MenuItem value="Science: Gadgets">Science: Gadgets</MenuItem>
 </Select>
        </FormControl>
          */}

{/*}
        <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="selectNumbeLabel">Number of questions</InputLabel>
        <Select
           labelId="selectNumberLabel"
           id="Number"
          label="Category">
           <MenuItem value={1}>1</MenuItem>
           <MenuItem value={2}>2</MenuItem>
           <MenuItem value={3}>3</MenuItem>
           <MenuItem value={4}>4</MenuItem>
           <MenuItem value={5}>5</MenuItem>
           <MenuItem value={6}>6</MenuItem>
           <MenuItem value={7}>7</MenuItem>
           <MenuItem value={8}>8</MenuItem>
           <MenuItem value={9}>9</MenuItem>
           <MenuItem value={10}>10</MenuItem>
           
 </Select>
        </FormControl>
*/}

          {/* 

<FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="numberOfQuestions">NumberOfQuestions</InputLabel>
        <BootstrapInput id="numberofQuestions" />
      </FormControl>
    */}

          <input type = "text" placeholder = "number of questions"></input>
          
        {/*
<FormControl sx={{ m: 1, minWidth: 120 }}>
<InputLabel id="selectDiffLabel">Difficulty</InputLabel>
<Select
labelId="selectDiffLabel"
id="selectDiff"
label="Difficulty">
<MenuItem value="easy">Easy</MenuItem>
<MenuItem value="medium">Medium</MenuItem>
<MenuItem value="hard">Hard</MenuItem>
</Select>
</FormControl>
*/}

<div className="dropdown"> 
<select>
<option value="" disabled selected>Select difficulty</option>
            <option value = "easy">Easy</option>
            <option value = "medium">Medium</option>
            <option value = "hard">Hard</option>
          </select> 
</div>
          <Button  type="submit" variant="contained" size="large">Submit</Button>
          

        </form>

    </div>
)
}

export default GameSettings