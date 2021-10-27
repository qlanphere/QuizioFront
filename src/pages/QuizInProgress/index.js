import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext, socket } from '../../contexts/socketContext';
import Question from "../../components/Question";
import { Answers } from '../../components';
import './quiz.css'

const QuizInProgress = () => {
 

  const { host, roomName, gameSettings, setGameSettings, questions, setQuestions, score, setScore} = useGameContext()
  // const { socket } = useContext(SocketContext)
  const [index, setIndex] = useState(0)
  const history = useHistory();
  const [chosenAnswer,setChosenAnswer]=useState()
  const [score, setScore]=useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  let options


   

  useEffect(() => {
    if (!gameStarted) {
      socket.emit('question-load', roomName)
      setGameStarted(true)
    }

      socket.on('timer', (count) => {
        console.log(count)
      })
    
      socket.on('next-question', () => {
        console.log(index, questions.length)
        if (index < questions.length-1) {
        handleNextQuestion()
        socket.emit('question-load', roomName)
        } else {
          console.log('game done')
          handleFinish()
        }
    
      })
    
  }, []);


  function handleNextQuestion() {
    if(chosenAnswer === decodeURIComponent(questions[index].correct_answer)){
      setScore(prev => prev + 10)
      console.log(`User's score is ${score}`)
    }
    setIndex(prev => prev + 1)
  }

  // ------  handling choice  
  function handleChoice(event) {
    let choice;
    choice = event.target.innerText
    setChosenAnswer(choice)
    console.log(choice)
    if(choice === decodeURIComponent(questions[index].correct_answer)){
      console.log(questions[index].correct_answer)
      console.log('you are correct')
    }
  }
  if (index < questions.length) {
  options = questions[index].allOptions.map((answ, i) =>
    // <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)
    <div>

      <p key={i} onClick={handleChoice} className={(decodeURIComponent(answ)===chosenAnswer)?"chosen":"answer"}>{decodeURIComponent(answ)}</p>
    </div>)
  }
  // ------------

  function handleFinish() {
    history.push(`/finish/${roomName}`)
  }

  return (
    <div  >

      <h2> Quiz in progress</h2>
      {(index<questions.length-1) ? <Question index={index} />: <></>}

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