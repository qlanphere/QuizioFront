import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext, socket } from '../../contexts/socketContext';
import Question from "../../components/Question";
import { Answers } from '../../components';
import './quiz.css'

const QuizInProgress = () => {
  // only want to start timer when a question loads
  socket.emit('question-load')

  const { host, roomName, gameSettings, setGameSettings, questions, setQuestions } = useGameContext()
  // const { socket } = useContext(SocketContext)
  const [index, setIndex] = useState(0)
  const history = useHistory();
  const [chosenAnswer,setChosenAnswer]=useState()
  const [score, setScore]=useState(0)

  console.log(socket)


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

  socket.on('timer', (count) => {
    setInterval(() => {
      if (count > 0) {
        count -= 1000 // decrease by 1s
        console.log(count)
      } else if (!count) {
        handleNextQuestion()
        socket.emit('reset')
      } else {
        return
      }
    }, 1000)
    // while (count > 0) {
    //   setInterval(() => {
    //     count -= 1000 // decrease by 1s
    //     console.log(count)
    //   }, 1000)
    // }
    // count hits 0 reset + move on
  });
  // on timer, if it hits zero move onto next question and emit reset timer

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


      {(index == (questions.length - 1)) ? <button onClick={handleFinish}>Finish</button> :
        <button onClick={handleNextQuestion}>Next</button>}
    </div>
  )
}


export default QuizInProgress;