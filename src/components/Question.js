import Options from "./Options"
import NextButton from "./NextButton"

function Question({ question, dispatch, answer, numQuestions, index }) {

    return(
        <div>
            Question number
            <h4>{question.question}</h4>
            <Options 
                question={question} 
                dispatch={dispatch} 
                answer={answer} 
            />
            <NextButton 
                dispatch={dispatch} 
                answer={answer} 
                numQuestions={numQuestions} 
                index={index}
            />
        </div>

    )
}

export default Question