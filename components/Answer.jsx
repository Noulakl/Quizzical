import React from "react"
import { useOutletContext } from "react-router"

export default function Answer({children, handleChange, id, field, isSelected, className,...rest}){
    const inpRef = React.useRef(null)
    const[quizContext] = useOutletContext()
    const {gameEnded} = quizContext
    return (
        <label 
            htmlFor={id} 
            className={className}
            style={{
                pointerEvents:gameEnded && "none"
            }}
            >
            {children}
            <input
                type="radio" 
                id={id} 
                name={field}
                value={children}
                defaultChecked={isSelected && true}
                ref={inpRef}
                onChange={e => handleChange(e)
                }
                />      
        </label>)
}