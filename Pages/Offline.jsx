import React from "react"
import Offline from "../assets/Broken-network.svg"
import { Link } from 'react-router'

 
export default function OfflinePage({children}){
    return (
        <div className="sadPath">
            <h1>{children}</h1>
            <img src={Offline} alt="Broken network by a thunder icon"/>
            <Link to="/" className= "active"> Try again </Link>

        </div>
    )
}