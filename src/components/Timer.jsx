import { useEffect, useRef, useState } from "react"
import Counter from "./Counter"

function Timer({gameActive}) {
    const [time,setTime] = useState(0)
    const timerRef  = useRef(null)

    useEffect(()=>{
        if (gameActive) {
            timerRef.current = setInterval(()=> {
                setTime(prevTime => prevTime + 1);
            },1000)
        } else {
            clearInterval(timerRef.current)
        }
        return () => clearInterval(timerRef.current)
    }, [gameActive])

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
