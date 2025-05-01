import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from "../store/counter";

const Counter = () => {
    const counter = useSelector((state) => state.counter.counter);
    const showCounter = useSelector((state) => state.counter.showCounter);
    const dispatch = useDispatch();
    const changeCounter = (value) => {
        dispatch(counterActions.change(value));
    };

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
                <div className={classes.value}>
                    {
                        showCounter ? <span>{counter}</span>: <span>**</span>
                    }
                </div>
            <div>
                <button onClick={() => changeCounter(1)}>Increment</button>
                <button onClick={() => changeCounter(5)}>Increment by 5</button>
                <button onClick={() => changeCounter(-1)}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
