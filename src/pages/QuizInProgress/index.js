import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext'
import { SocketContext, socket } from '../../contexts/socketContext';
import Question from "../../components/Question";
import { Answers } from '../../components';

const QuizInProgress = () => {
  // only want to start timer when a question loads
  socket.emit('question-load')
  
  const { host, roomName, gameSettings, setGameSettings, questions, setQuestions } = useGameContext()
  // const { socket } = useContext(SocketContext)
  const [index, setIndex] = useState(0)
  const history = useHistory();
  
  
  function handleNextQuestion() {
    setIndex(prev => prev + 1)
  }
  
  
  socket.on('timer', (count) => {
    setInterval(()=>{
      if (count > 0){
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
      <Answers index={index} />

      <span></span>


      {(index === (questions.length - 1)) ? <button onClick={handleFinish}>Finish</button> :
        <button onClick={handleNextQuestion}>Next</button>}
    </div>
  )
}


export default QuizInProgress;