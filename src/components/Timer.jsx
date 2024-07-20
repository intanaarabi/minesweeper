import { useEffect, useRef, useState } from "react"
import Counter from "./Counter"

function Timer({gameActive, gamePaused, onPausedTime}) {
    const [time,setTime] = useState(0)
    const timerRef  = useRef(null)

    useEffect(()=>{
        if (gameActive && !gamePaused) {
            timerRef.current = setInterval(()=> {
                setTime(prevTime => prevTime + 1);
            },1000)
        } else {
            clearInterval(timerRef.current)
            if (gamePaused) {
                const currentTime = time;
                onPausedTime(currentTime)
            }
        }
        return () => clearInterval(timerRef.current)
    }, [gameActive, gamePaused])

    useEffect(()=> {
        if (!gameActive) {
            setTime(0)
        }
    },[gameActive])

    return (
        <Counter value={time}/>
    )
}

export default Timer
