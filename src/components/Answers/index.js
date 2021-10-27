import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 

const Answers = ({index}) => {

    const { questions} = useGameContext()
    const [score, setScore]=useState(0)
    

    
   function handleAnswer(event){
     setScore(score + (event.target.innerText === decodeURIComponent(questions[index].correct_answer)))
     console.log(score)
   }

   const options = questions[index].allOptions.map( (answ,i) =>       
    <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)

    return (
      <div>

    <h2> answers {index+1}</h2>
    {options}
      </div>
   

    

    )
}
export default Answers
