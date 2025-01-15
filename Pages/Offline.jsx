import React from "react"
import Offline from "../assets/Broken-network.svg"
 
export default function OfflinePage({children}){
    return (
        <div className="sadPath">
            <h1>{children}</h1>
            <img src={Offline} alt="Broken network by a thunder icon"/>
        </div>
    )
}