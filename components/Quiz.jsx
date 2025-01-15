import React from "react"

export default function Quiz({question, children, id}){
    return (
    <fieldset className="quizz" key={`field${id}`}>
        <legend className="question">
            {question}
        </legend>
            {children} 
    </fieldset>
    )
}