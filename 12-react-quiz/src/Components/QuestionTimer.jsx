import {useEffect, useState} from "react";

export default function QuestionTimer({ timeOut, onTimeOut, mode }) {
    const [remainingTime, setRemainingTime] = useState(timeOut);

    useEffect(() =>{
        console.log('SETTING TIME OUT');
        const timer = setTimeout(onTimeOut, timeOut);

        return () => {
            console.log('CLEANING TIMER');
            clearTimeout(timer);
        }
    }, [onTimeOut, timeOut]);


    useEffect(() => {
        console.log('SETTING INTERVAL');
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100);

        return () => {
            console.log('CLEANING INTERVAL');
            clearInterval(interval);
        }
    }, []);


    return <progress
        id="question-time"
        max={timeOut}
        value={remainingTime}
        className={mode}
    />
}
