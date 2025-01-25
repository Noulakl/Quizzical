import React from "react"
import clsx from "clsx"
import Quiz from "../components/Quiz"
import Answer from "../components/Answer"
import {decode} from "html-entities"
import { useOutletContext, Link } from 'react-router'
import ResetButton from "../components/ResetButton"

export default function ResultPage(){
    const [quizContext, setQuizContext] = useOutletContext()

    const {quizes,score} = quizContext
    const quizForm = React.useRef(null)


    const quizEl = quizes && quizes.map(quiz => {
        const quizId = quiz.id
        const answersEl = quiz.answers.map(answer =>{
            const correct = answer.isCorrect 
            const isRight = answer.isSelected && answer.isCorrect
            const isWrong = answer.isSelected && !answer.isCorrect
            const variant = clsx(
                "remainig",{
                right:isRight || correct,
                wrong:isWrong,
                }
            )
            return(
            <Answer 
                id={answer.id} 
                key={answer.id} 
                isSelected = {answer.isSelected}
                className={variant}
                >

                {decode(answer.answer)}

            </Answer>)
            })

        return (
            <Quiz question={decode(quiz.question)} id={quizId} key={quizId}>
                {answersEl}
            </Quiz>
        )
    })
    return (
    <section className="result_page">
                <form 
                className="answers-container" 
                id="answers-container"
                ref={quizForm} 
        >
            {quizEl}
        </form>
         <h2 className="score"> Your score is {score} / 5 </h2>
         <ResetButton> Choose different category </ResetButton>
         <Link to="/quizPage" className="active"> Play again </Link>
    </section>
    )
}