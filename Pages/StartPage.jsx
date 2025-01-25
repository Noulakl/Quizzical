import React from "react"
import { useOutletContext, Link } from 'react-router'


export default function StartPage(){
    const [quizContext, setQuizContext] = useOutletContext()
    const {hasChosen} = quizContext 
    const categoryEl = React.useRef(null)
    const difficultyEl = React.useRef(null)
    function checkIfReady(){
        categoryEl.current.value !== "choose" && difficultyEl.current.value !== "choose" && setQuizContext( prev => 
            {
            return {
                ...prev,
                hasChosen:true,
                apiLink:`https://opentdb.com/api.php?amount=05&category=${categoryEl.current.value}&difficulty=${difficultyEl.current.value}&type=multiple`
            }
            })
        }
    return (
        <section className="game-setting">
            <h1 className="title">Quizzical</h1>
            <h2 className="title">Challenge yourself with random quizzes</h2>
            <form id="settings" className="settings">
                <select name="trivia_category" id="category" className="quizz_setting" onClick={checkIfReady} ref={categoryEl}>
                    <option value="choose" className="choose">--- Choose category ---</option>

                    <optgroup label="General knowledge 🌍">

                        <option value="any"> Random </option>
                        <option value="9"> General Knowledge </option>
                        <option value="20"> Mythology </option>
                        <option value="21"> Sports </option>
                        <option value="22"> Geography </option>
                        <option value="23"> History </option>
                        <option value="24"> Politics </option>
                        <option value="25"> Art </option>
                        <option value="26"> Celebrities </option>
                        <option value="27"> Animals </option>
                        <option value="28"> Vehicles </option>
                        
                    </optgroup>
                    <optgroup label="Entertainment 🎭">

                        <option value="10"> Books </option>
                        <option value="11"> Film </option>
                        <option value="12"> Music </option>
                        <option value="13"> Musicals and Theatres </option>
                        <option value="14"> Television </option>
                        <option value="15"> Video Games </option>
                        <option value="16"> Board Games </option>
                        <option value="29"> Comics </option>
                        <option value="31"> Japanese Anime and Manga </option>
                        <option value="32"> Cartoon and Animations </option>

                    </optgroup>
                    <optgroup label="Science 🧪">

                        <option value="17"> Science and Nature </option>
                        <option value="18"> Computers </option>
                        <option value="19"> Mathematics </option>
                        <option value="30"> Gadgets </option>

                    </optgroup>
                </select>

                <select name="trivia_difficulty" id="diffuculty" className="quizz_setting" onClick={checkIfReady} ref={difficultyEl}>
                    <option value="choose" className="choose">--- Choose difficulty ---</option>
                    <option value="any"> Random 😎</option>
                    <option value="easy"> Noobs 😗</option>
                    <option value="medium"> Pro 🤓</option>
                    <option value="hard"> God 🧐</option>
                </select>
            </form>

           { 
           <Link 
                className={hasChosen ? "active" : "disabled"} 
                to={"quizPage"}
                style={
                    {
                        pointerEvents:!hasChosen ? 'none' : 'auto',
                    }
                }
                > 
                Start Quizz 
            </Link>}
        <p>App By Nola kely</p>
        </section>
    )
}