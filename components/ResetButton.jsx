import React from "react";
import { useOutletContext, Link } from "react-router";
export default function ResetButton({children}){
    const [quizContext, setQuizContext] = useOutletContext()
        function playAgain(){
            setQuizContext(prev=>{
                return(
                    {
                        ...prev,
                        hasChosen:false,
                        score:0,
                        gameEnded:false,
                        quizes:[]
                    }
                )
            })
        }
    return(
        <Link to="/" onClick={()=>playAgain()} className="active"> {children}</Link>
    )
}