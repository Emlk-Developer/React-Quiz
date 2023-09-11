import Header from './Header'
import StartScreen from '../StartScreen'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import Question from './Question'
import Timer from './Timer'
import Progress from './Progress'
import FinishedScreen from './FinishedScreen'
import '../App.css';
import { useEffect, useReducer } from 'react';

const SECONDS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null
}

function reducer(currentState, action) {
  switch(action.type) {
    case 'dataReceived':
      return {
        // destructuring the currentState object in order to update 'questions' and 'status'
        ...currentState, 
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...currentState,
        status: 'error',
      }
    case 'start':
      return {
        ...currentState,
        status: 'active',
        secondsRemaining: currentState.questions.length * SECONDS_PER_QUESTION
      }
    case 'newAnswer':
      const thisquestion = currentState.questions[currentState.index]

      console.log(thisquestion)
      return {
        ...currentState,
        answer: action.payload,
        points:
          thisquestion.correctOption === action.payload ? 
          currentState.points + thisquestion.points
          : currentState.points
      }
    case 'nextQuestion':
      return {
        ...currentState,
        index : currentState.index + 1,
        answer: null
      }
    case 'finish':
      return{
        ...currentState,
        status:'finished'
      }
    case 'restart':
      return{
        ...currentState,
        questions: [],
        status: 'ready',
        index: 0,
        answer: null,
        points: 0
      }
    case 'timer':
      return {
        ...currentState,
        secondsRemaining: currentState.secondsRemaining - 1,
        status: currentState.secondsRemaining === 0 ? 'finished' : currentState.status
      }
      
    default:
      throw new Error("action unknown");
  }
}

function App() {
  //destructure state which is a paramter passed into the reducer function
  const [{questions, status, index, answer, points, secondsRemaining}, dispatch] = useReducer(reducer, initialState)

  const numberOfQuestions = questions.length
  const maxPoints = questions.reduce((acc, currentQuestion) => acc + currentQuestion.points, 0)
  console.log(maxPoints)

  useEffect(function(){
    try {
      async function fetchData() {
        const data = await fetch('http://localhost:3000/questions')
        const response = await data.json()
        dispatch({type: 'dataReceived', payload :response })
      }
      fetchData()
    } catch(err) {
      dispatch({type: 'dataFailed', payload: err})
      console.error(err);
    }

  },[])

  return (
    <div className='app'>
     <Header />
     <Main>
      {status === 'loading' && <Loader />}
      {status === 'error' && <Error />}
      {status === 'ready' && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
      {status === 'active' && 
      <>
        <Progress 
          numQuestions={numberOfQuestions} 
          index={index} 
          points={points} 
          maxPoints={maxPoints} 
          answer={answer}
        />
        <Question 
          question={questions[index]} 
          dispatch={dispatch}
          answer={answer}
          numQuestions={numberOfQuestions}
          index={index}
        />
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
      </>
      }
      {status === 'finished' && 
        <FinishedScreen 
          points={points} 
          maxPoints={maxPoints} 
          dispatch={dispatch} 
        />
      }
     </Main>
    </div>
  );
}

export default App;