import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 
import Question from "../../components/Question";
import { Answers } from '../../components';

const QuizInProgress = () => {

  const {host, roomName, gameSettings, setGameSettings, questions, setQuestions} = useGameContext()
  const[index, setIndex]=useState(0)
  const history = useHistory();
  

function handleNextQuestion() {
 setIndex(index+1)

}

function handleFinish(){
  history.push(`/finish/${roomName}`)
}

return (
  <div  >

  <h2> Quiz in progress</h2>
  <Question index={index} />
  <Answers index={index} />

{(index == (questions.length-1)) ? <button onClick={handleFinish}>Finish</button> :
 <button onClick={handleNextQuestion}>Next</button>}
</div>
    )
  }


export default QuizInProgress;