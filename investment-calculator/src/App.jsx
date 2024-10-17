import {useState} from "react";
import Header from "./components/Header.jsx";
import UserInputs from "./components/UserInputs.jsx";
import Results from "./components/Results.jsx";

const INVESTMENT = {
    initialInvestment: 15000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
}
function App() {
    const [userInput, setUserInput] = useState(INVESTMENT);

    const inputIsValid = userInput.duration >= 1;
    function handleInvestmentChange(inputIdentifier, newValue) {
        const updatedInvestment = {
            ...userInput,
            [inputIdentifier]: +newValue
        }
        setUserInput(updatedInvestment);
    }

    return (
        <>
            <Header />
            <UserInputs userInput={userInput} onChange={handleInvestmentChange} />

            { !inputIsValid && <p className="center">Please enter a duration greater than zero.</p> }
            { inputIsValid && <Results userInput={userInput} /> }
        </>
    )
}

export default App
