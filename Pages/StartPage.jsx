import React from "react"
import { useOutletContext, Link } from 'react-router'


export default function StartPage(){
    const [quizContext, setQuizContext] = useOutletContext()
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
                    <option value="choose">--- Choose category ---</option>
                    <option value="any"> Random </option>
                    <option value="9"> General Knowledge </option>
                    <option value="10"> Entertainment: Books </option>
                    <option value="11"> Entertainment: Film </option>
                    <option value="12"> Entertainment: Music </option>
                    <option value="13"> Entertainment: Musicals &amp; Theatres </option>
                    <option value="14"> Entertainment: Television </option>
                    <option value="15"> Entertainment: Video Games </option>
                    <option value="16"> Entertainment: Board Games </option>
                    <option value="17"> Science &amp; Nature </option>
                    <option value="18"> Science: Computers </option>
                    <option value="19"> Science: Mathematics </option>
                    <option value="20"> Mythology </option>
                    <option value="21"> Sports </option>
                    <option value="22"> Geography </option>
                    <option value="23"> History </option>
                    <option value="24"> Politics </option>
                    <option value="25"> Art </option>
                    <option value="26"> Celebrities </option>
                    <option value="27"> Animals </option>
                    <option value="28"> Vehicles </option>
                    <option value="29"> Entertainment: Comics </option>
                    <option value="30"> Science: Gadgets </option>
                    <option value="31"> Entertainment: Japanese Anime &amp; Manga </option>
                    <option value="32"> Entertainment: Cartoon &amp; Animations </option>
                </select>

                <select name="trivia_difficulty" id="diffuculty" className="quizz_setting" onClick={checkIfReady} ref={difficultyEl}>
                    <option value="choose">--- Choose difficulty ---</option>
                    <option value="any"> Random </option>
                    <option value="easy"> Noobs </option>
                    <option value="medium"> Pro </option>
                    <option value="hard"> God </option>
                </select>
            </form>
            <Link className={quizContext.hasChosen ? "active" : "disabled"} to={"quizPage"} > Start Quizz </Link>
        </section>
    )
}