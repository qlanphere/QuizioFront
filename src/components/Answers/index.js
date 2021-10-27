import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 

const Answers = ({index}) => {

    const { questions} = useGameContext()
    const [score, setScore]=useState(0)
    
  
    const allOptions = questions[index].incorrect_answers
    allOptions.push(questions[index].correct_answer)
    
   function handleAnswer(event){
     setScore(score + (event.target.innerText === decodeURIComponent(questions[index].correct_answer)))
     console.log(score)
   }

//  to shuffle the  answers array
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


   const options = shuffle(allOptions).map( (answ,i) => 
   /* <button key={i} onClick={()=>console.log(answ ===questions[index].correct_answer)} >{containsEncodedComponents(answ)}</button>)*/
      
    <button key={i} onClick={handleAnswer } >{decodeURIComponent(answ)}</button>)

    return (
      <div>

    <h2> answers {index+1}</h2>
    {options}
      </div>
   

    

    )
}
export default Answers
