import React from "react"
import StartPage from "/Pages/StartPage.jsx"
import ResultPage from "/Pages/ResultPage.jsx"
import QuizzPage from "/Pages/QuizzPage.jsx"
import { BrowserRouter,Routes,Route,Outlet} from 'react-router'

export default function App(){



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
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Outlet context={[quizContext , setQuizContext]}/> }>
                    <Route index element={<StartPage/>}/>
                    <Route path="quizPage" element={<QuizzPage/>}/>
                    <Route path="resultPage" element={<ResultPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}