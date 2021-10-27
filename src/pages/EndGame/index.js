import React from "react";
import { useGameContext } from "../../contexts/gameContext";
const EndGame = () => {

    const {score, questions} = useGameContext()
    return (
        <>
    <div>Game over!</div>
    <p>Final Score: {score}/{questions.length}</p>
        </>
    )
}

export default EndGame