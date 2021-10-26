import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 

const Answers = (props) => {

    const { questions} = useGameContext()
    const [score, setScore]=useState(0)
    
  
    const allOptions = questions[props.index].incorrect_answers
    allOptions.push(questions[props.index].correct_answer)
    
   function handleAnswer(event){
     setScore(score + (event.target.innerText === decodeURIComponent(questions[props.index].correct_answer)))
     console.log(score)
   }

   const options = allOptions.map( (answ,i) => 
   /* <button key={i} onClick={()=>console.log(answ ===questions[props.index].correct_answer)} >{containsEncodedComponents(answ)}</button>)*/
      
    <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)

    return (
      <div>

    <h2> answers {props.index+1}</h2>
    {options}
      </div>
   

    

    )
}
export default Answers
