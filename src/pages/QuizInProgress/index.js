import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext, socket } from '../../contexts/socketContext';
import Question from "../../components/Question";
import { Answers } from '../../components';
import './quiz.css'

const QuizInProgress = () => {
 

  const { host, roomName, gameSettings, setGameSettings, questions, setQuestions } = useGameContext()
  // const { socket } = useContext(SocketContext)
  const [index, setIndex] = useState(0)
  const history = useHistory();
  const [chosenAnswer,setChosenAnswer]=useState()
  const [score, setScore]=useState(0)
  const [gameStarted, setGameStarted] = useState(false)


   

  useEffect(() => {
    if (!gameStarted) {
      socket.emit('question-load', roomName)
      setGameStarted(true)
    }

      socket.on('timer', (count) => {
        console.log(count)
      })
    
      socket.on('next-question', () => {
        if (index < questions.length-1) {
        handleNextQuestion()
        socket.emit('question-load', roomName)
        } else {
          console.log('game done')
        }
    
      })
    
  }, []);


  function handleNextQuestion() {
    setScore(score + (chosenAnswer === decodeURIComponent(questions[index].correct_answer)))
    console.log(score)
    console.log(chosenAnswer)
    setIndex(prev => prev + 1)


  }

  // ------  handling choice  
  function handleChoice(event) {
    setChosenAnswer(event.target.innerText)
  }
  const options = questions[index].allOptions.map((answ, i) =>
    // <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)
    <div>

      <card key={i} onClick={handleChoice} className={(decodeURIComponent(answ)===chosenAnswer)?"chosen":"answer"}>{decodeURIComponent(answ)}</card>
    </div>)
  // ------------

  function handleFinish() {
    history.push(`/finish/${roomName}`)
  }

  return (
    <div  >

      <h2> Quiz in progress</h2>
      <Question index={index} />

      <div>

        <h2> answers {index + 1}</h2>
        {options}
      </div>




      <span></span>


      {/* {(index === (questions.length - 1)) ? <button onClick={handleFinish}>Finish</button> :
        <button onClick={handleNextQuestion}>Next</button>} */}
    </div>
  )
}


export default QuizInProgress;