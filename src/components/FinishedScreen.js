function FinishedScreen({points, maxPoints, dispatch}) {
    return(
        <>
        <p className="result">You scored <strong>{points}</strong> out of {maxPoints}</p>
        <button className="btn" onClick={() => dispatch({type: 'restart'})}>Restart Quiz</button>
        </>
    )
}

export default FinishedScreen 