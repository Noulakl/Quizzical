    import React from "react"
    import { useOutletContext } from "react-router"
    import { nanoid } from "nanoid"

    export default function fetchData(){
    const [quizContext, setQuizContext] =useOutletContext()  

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
                    hasInternet:BrowserInternet,
                    loading:true
                }
            })
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
                            hasInternet:BrowserInternet,
                            hasChosen:false,
                            loading:false
                        }
                    })
                }).catch( err =>{
                    setQuizContext(prev => {
                        return {
                            ...prev,
                            error:err.message
                        }
                    })
                })
            }
        ,[quizContext.apiLink])
}