import { useEffect } from "react"

function Timer({secondsRemaining, dispatch}) {
    useEffect(function(){
        const id = setInterval(function(){
            dispatch({type: 'timer'})
        } , 1000)

        return () => clearInterval(id);
        
    },[dispatch])
    return(
        <div className="timer">{secondsRemaining}</div>

    )
}
export default Timer