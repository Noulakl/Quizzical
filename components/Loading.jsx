import React from "react"
import Questioning from "../assets/Questioning.svg"
import Bof from "../assets/Bof.svg"
import Geek from "../assets/Geek.svg"
 
export default function Loading(){
    return (
        <div className="loadingCont">
            <h1> Loading</h1>
            <div className="dots">
                <img src={Questioning} alt=" an emojy Questioning"/>
                <img src={Bof} alt=" an emojy Bof"/>
                <img src={Geek} alt=" an emojy Geek"/>
            </div>
        </div>
    )
}