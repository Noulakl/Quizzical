import React from "react"
import Sad from "../assets/sad-face.svg"


 
export default function ErroPage({children}){
    return (
        <div className="sadPath">
            <img src={Sad} alt="Sad face smiling a little"/>
            {children}
        </div>
    )
}