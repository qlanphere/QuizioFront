import React, {useState, useEffect} from 'react'
import { useAuthContext } from '../../contexts/auth'
import { useGameContext } from '../../contexts/gameContext' 


const Question = (props) => {

    const { questions} = useGameContext()
    console.log(questions)
  
  
    const questionArrayLength = questions.length;
  

    function containsEncodedComponents(text) {
      return decodeURIComponent(text);
    }
    
  
    let questionNumber = props.index + 1
    
  
    return (
      <div >
        
        <h3 >Question {questionNumber} of {questionArrayLength}:<br></br> 
          {containsEncodedComponents(questions[props.index].question)}
        </h3>
      </div>
    );
  };
  
  export default Question;
  