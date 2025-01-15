import React from "react"
import clsx from "clsx"
import Quiz from "../components/Quiz"
import Answer from "../components/Answer"
import {decode} from "html-entities"
import { useOutletContext, Link } from 'react-router'


export default function ResultPage(){
    const [quizContext, setQuizContext] = useOutletContext()

    const {quizes,score} = quizContext
    const quizForm = React.useRef(null)


    const quizEl = quizes.map(quiz => {
        const quizId = quiz.id
        const answersEl = quiz.answers.map(answer =>{
            const isRight = answer.isSelected && answer.isCorrect
            const isWrong = answer.isSelected && !answer.isCorrect
            const variant = clsx(
                "remainig",{
                right:isRight,
                wrong:isWrong
                }
            )
            return(
            <Answer 
                id={answer.id} 
                key={answer.id} 
                isSelected = {answer.isSelected}
                className={variant}
                >

                {answer.answer}

            </Answer>)
            })

        return (
            <Quiz question={decode(quiz.question)} id={quizId} key={quizId}>
                {answersEl}
            </Quiz>
        )
    })

    function playAgain(){
        setQuizContext(prev=>{
            return(
                {
                    ...prev,
                    hasChosen:false,
                    apiLink:"",
                    score:0,
                    gameEnded:false,
                    quizes:[]
                }
            )
        })
    }
    return (
    <section className="result_page">
                <form 
                className="answers-container" 
                id="answers-container"
                ref={quizForm} 
        >
            {quizEl}
        </form>
         <h2> Your score is {score} / 5 </h2>
         <Link to="/" className= "active" onClick={playAgain}> Play again</Link>
    </section>
    )
}