import React from "react";
import { Outlet } from "react-router";
import Yellow from "../src/assets/yellow_decore.svg"
import Blue from "../src/assets/blue_decore.svg"

export default function Layout(){
    const [quizContext, setQuizContext] = React.useState(

        {
            hasChosen:false,
            apiLink:"",
            score:0,
            gameEnded:false,
            hasInternet:true,
            quizes:[],
            error:null,
            loading:null
        }
    )
return(
    <>
        <img src={Yellow}  
            style={{
                position:"fixed",
                top:0,
                right:0,
                zIndex:-1}
            }/>

         <Outlet context={[quizContext , setQuizContext]}/>
        <img src={Blue} 
            style={
                {position:"fixed",
                bottom:0,
                left:0,
                zIndex:-1}
            }/>
    </>
)

}