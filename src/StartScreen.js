function StartScreen({numberOfQuestions, dispatch}) {
    return(
        <div className="start">
            <h2>Welcome to React Quiz</h2>
            <h3>{numberOfQuestions} Questions to Test your react knowledge</h3>
            <button className="btn" onClick={() => dispatch({type : 'start'})}>Lets Go</button>
        </div>

    )
}

export default StartScreen