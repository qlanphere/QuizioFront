import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { socket } from '../../contexts/socketContext';
import Question from "../../components/Question";
import {Button} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import './quiz.css'

const QuizInProgress = () => {
 

  const { host, roomName, gameSettings, setGameSettings, questions, setQuestions, score, setScore, index, setIndex} = useGameContext()
  const { currentUser } = useAuthContext()
  // const { socket } = useContext(SocketContext)

  const history = useHistory();
  const [chosenAnswer,setChosenAnswer]=useState()
  const [gameStarted, setGameStarted] = useState(false)
  const [percent, setPercent] = useState(100)
  const [questionChanged, setQuestionChanged] = useState(false)
  let options

  if (!currentUser) {
    history.push('/')
}
   

  if (index == questions.length) {
    socket.off('next-question')
    socket.off('question-load')
    socket.off('timer')
    history.push(`/finish/${roomName}`)
  }

  useEffect(() => {
    if (!gameStarted) {
      socket.emit('question-load')
      setGameStarted(true)
    }

      socket.on('timer', (count) => {
        //console.log(count)
        setPercent(count/100)
      })
    
      socket.on('next-question', () => {
        // console.log(index, questions.length)
        // handleNextQuestion(i)
        setQuestionChanged(true)
        setPercent(100)
        socket.emit('question-load')
      })
    
  }, []);

  if (questionChanged) {
    handleNextQuestion()
    setQuestionChanged(false)
  }


  function handleNextQuestion() {
    console.log(index, chosenAnswer)
    if(chosenAnswer === decodeURIComponent(questions[index].correct_answer) && index < questions.length -1){
      setScore(prev => prev + 10)
      setIndex(prev => prev + 1)
      console.log(`User's score is ${score}`)
    } else if (chosenAnswer !== decodeURIComponent(questions[index].correct_answer) && index < questions.length -1){
      setIndex(prev => prev + 1)
      console.log(`User's score is ${score}`)
    } else if (chosenAnswer !== decodeURIComponent(questions[index].correct_answer) && index === questions.length -1) {
      console.log(`User's score is ${score}`)
      history.push(`/finish/${roomName}`)
    } else {
      setScore(prev => prev + 10)
      console.log(`User's score is ${score}`)
      history.push(`/finish/${roomName}`)
    }
  }

  // ------  handling choice  
  function handleChoice(event) {
    let choice;
    choice = (event.target.innerText)
    setChosenAnswer(choice)
    console.log(choice)
    console.log(questions[index].correct_answer)
    if(choice === decodeURIComponent(questions[index].correct_answer)){
      console.log(questions[index].correct_answer)
      console.log('you are correct')
    }
  }
  if (index < questions.length) {
  options = questions[index].allOptions.map((answ, i) =>
    // <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)
    <div>

      <Button  style = {{textTransform: 'none'}}  key={i} onClick={handleChoice} className={(decodeURIComponent(answ)===chosenAnswer)?"chosen":"answer"}>{decodeURIComponent(answ)}</Button>
    </div>)
  }

  return (
    <div  >

      <h2> Quiz in progress</h2>
      {(index<questions.length) ? <Question index={index} />: <></>}

      <div>

        <h2> answers {index + 1}</h2>
        {options}
        <CircularProgress variant = "determinate" color = {(percent>30) ? "success": "error"} value = {percent} style = {{transition: 'none'}}/>
      </div>




      <span></span>


      {/* {(index === (questions.length - 1)) ? <button onClick={handleFinish}>Finish</button> :
        <button onClick={handleNextQuestion}>Next</button>} */}
    </div>
  )
}


export default QuizInProgress;