import React from "react"
import Sad from "../assets/Sad-face.svg"
 
export default function ErroPage({children}){
    return (
        <div className="sadPath">
            <h1> {children} </h1>
            <img src={Sad} alt="Sad face smiling a little"/>
        </div>
    )
}