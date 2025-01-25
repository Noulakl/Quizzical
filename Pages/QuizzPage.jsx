import React from "react"
import Quiz from "../components/Quiz"
import Answer from "../components/Answer"
import {decode} from "html-entities"
import { useOutletContext, Link } from 'react-router'
import OfflinePage from "./Offline"
import ErroPage from "./ErrorPage"
import Loading from "../components/Loading"
import fetchData from "../api"
import ResetButton from "../components/ResetButton"

export default function QuizzPage(){
    const [quizContext, setQuizContext] =useOutletContext()
    const {quizes, gameEnded,hasInternet,error,loading} = quizContext
    const quizForm = React.useRef(null)
    const chosenAnswersCount = React.useRef(0) 

    fetchData()
    function handleChange(e) {
        const { value, name } = e.target
        const chosenAnswers= quizes && quizes.map(quiz=> {
            return quiz.answers.filter(answer => answer.isSelected === true).length
        }).filter(answer => answer == 1).length
        
        const updatedQuizes = quizes && quizes.map(quiz => {
            if (quiz.id === name) { 
                return {
                    ...quiz,
                    answers: quiz.answers.map(answer => {
                        return {
                            ...answer,
                            isSelected: answer.answer === value
                        }
                    })
                }
            }
            return quiz 
        })
        
        setQuizContext(prev => ({
            ...prev,
            quizes: updatedQuizes
        }))
        chosenAnswersCount.current = chosenAnswers
    }

    function checkAnswers(){
      
        const score= quizes && quizes.map(quiz=> {
            return quiz.answers.filter(answer => answer.isSelected && answer.isCorrect ).length
        }).filter(answer => answer == 1).length

        setQuizContext(prev =>(
            {
                ...prev,
                score:score,
                gameEnded:!gameEnded
            }
            
        ))
    }

    // Rendering the quizes
    const quizEl = quizes && quizes.map(quiz => {
        const quizId = quiz.id
        const answersEl = quiz.answers.map(answer =>{ 
            return(
            <Answer 
                handleChange={e => handleChange(e)} 
                id={answer.id} 
                field={quizId} 
                key={answer.id} 
                isSelected = {answer.isSelected} >
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
<>
    {        
    error && hasInternet ?
        <ErroPage>
            <h1> Ooops! something went wrong. Please try again later. </h1>
            <Link to="/" className="active"> Try again </Link>  
        </ErroPage> :
    !hasInternet ? 
        <OfflinePage>
            <h1>You are offline, please connect to the Internet.</h1>
            <Link to="/quizPage" className="active"> Try again </Link>        
        </OfflinePage> : 
    loading ? <Loading/> :
    <section className="quizz-section">
        <form 
            className="answers-container" 
            id="answers-container"
            ref={quizForm}>
            {quizEl}
        </form>
       {chosenAnswersCount.current > 2 && <Link  
            className= {`active check`}
            to={"/resultPage"}
            onClick={checkAnswers}> 
            Check answers
        </Link>}
    </section>
    }
</>
    )
}