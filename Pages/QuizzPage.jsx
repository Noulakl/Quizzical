import React from "react"
import Quiz from "../components/Quiz"
import Answer from "../components/Answer"
import {decode} from "html-entities"
import { nanoid } from "nanoid"
import { useOutletContext, Link } from 'react-router'
import OfflinePage from "./Offline"
import ErroPage from "./ErrorPage"
import Loading from "../components/Loading"


export default function QuizzPage(){
    const [status, setStatus] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(null)
    const [quizContext, setQuizContext] =useOutletContext()
    const {quizes, gameEnded,hasInternet} = quizContext
    const quizForm = React.useRef(null)
    const chosenAnswersCount = React.useRef(0) 

    function shuffle(array) {
        const shuffled = [...array]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); 
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    React.useEffect(()=>{
        const BrowserInternet = navigator.onLine
        setQuizContext(prev => {
            return {
                ...prev,
                hasInternet:BrowserInternet
            }
        })
        setLoading(true)
        fetch(quizContext.apiLink)
            .then(res=>res.json())
            .then(data => {
                const allQuiz = data.results.map(quiz => {
                    const incorrectAnswers = quiz.incorrect_answers.map(answer => (
    
                    { 
    
                        id: `IncorrectAns${nanoid()}`,
                        answer: answer, 
                        isCorrect: false, 
                        isSelected:false 
    
                    }))
    
                    const correctAnswer = 
                    { 
                        id: `CorrectAns_${nanoid()}`,
                        answer: quiz.correct_answer, 
                        isCorrect: true, 
                        isSelected:false 
                    }
    
                    const allAnswers = [...incorrectAnswers, correctAnswer]
                    const{gameEnded} = quizContext
                    return {
                        id: `quiz_${nanoid()}`,
                        question: quiz.question,
                        answers: !gameEnded && shuffle(allAnswers),
                    }   
                })
                setQuizContext(prev => {
                    return {
                        ...prev,
                        quizes:allQuiz,
                        hasInternet:hasInternet,
                        hasChosen:false
                    }
                })
                setLoading(false)
            }).catch( err =>{
                setError(err.message)
                setLoading(false)
            })
            setStatus("ready")
        }
    ,[quizContext.apiLink])

    function handleChange(e) {
        const { value, name } = e.target
        const chosenAnswers= quizes.map(quiz=> {
            return quiz.answers.filter(answer => answer.isSelected === true).length
        }).filter(answer => answer == 1).length
        
        const updatedQuizes = quizes.map(quiz => {
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
      
        const score= quizes.map(quiz=> {
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
    const quizEl = quizes.map(quiz => {
        const quizId = quiz.id
        const answersEl = quiz.answers.map(answer =>{ 
            return(
            <Answer 
                handleChange={e => handleChange(e)} 
                id={answer.id} 
                field={quizId} 
                key={answer.id} 
                isSelected = {answer.isSelected} >
                {answer.answer}
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
            Ooops! something went wrong. Please try again later
        </ErroPage> :
    !hasInternet ? 
        <OfflinePage>
            You are offline, please connect to the Internet.
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