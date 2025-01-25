import React from "react"
import StartPage from "/Pages/StartPage.jsx"
import ResultPage from "/Pages/ResultPage.jsx"
import QuizzPage from "/Pages/QuizzPage.jsx"
import { BrowserRouter,Routes,Route,Outlet} from 'react-router'
import Layout from "../components/Layout"
export default function App(){

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/> }>
                    <Route index element={<StartPage/>}/>
                    <Route path="quizPage" element={<QuizzPage/>}/>
                    <Route path="resultPage" element={<ResultPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}