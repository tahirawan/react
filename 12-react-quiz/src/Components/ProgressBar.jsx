import {useState} from "react";

export default function ProgressBar({ remainingTime, timer }) {
    const [remainingTime, setRemainingTime] = useState();
    return <progress id="question-time" value={ remainingTime } max={timer} />
}
