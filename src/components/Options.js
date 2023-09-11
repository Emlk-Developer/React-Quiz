function Options({ question, dispatch, answer }) {
    //Boolean const - is answer not equal to null ?
    const hasAnswered = answer !== null

    return (
        <div className="options">
        {question.options.map((currentQuestion, index) => 
            <button 
                key={currentQuestion} 
                className={`btn btn-option 
                    ${index === answer ? "answer" : ""} 
                    ${ hasAnswered ?
                            index === question.correctOption ? "correct" : "wrong"
                        :
                            ""
                    }
                 `}
                onClick={() => dispatch({ type: 'newAnswer', payload: index})}
                disabled={hasAnswered}
            >
                {currentQuestion}
            </button>
        )}
    </div>
    )
}

export default Options