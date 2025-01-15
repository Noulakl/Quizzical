import React from "react"


export default function Answer({children, handleChange, id, field, isSelected, className,...rest}){
    const inpRef = React.useRef(null)
    return (
        <label 
            htmlFor={id} 
            className={className}
            >
            {children}
            <input
                type="radio" 
                id={id} 
                name={field}
                value={children}
                defaultChecked={isSelected && true}
                ref={inpRef}
                onChange={e => handleChange(e)}
                />      
        </label>)
}