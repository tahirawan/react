export default function UserInputs({userInput, onChange}) {
    return (

        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial investment</label>
                    <input
                        type="number"
                        value={userInput.initialInvestment}
                        required
                        name="investment"
                        onChange={(event) => onChange('initialInvestment', event.target.value)}
                    />
                    <label>Annual investment</label>
                    <input
                        type="number"
                        value={userInput.annualInvestment}
                        required
                        name="annual_investment"
                        onChange={(event) => onChange('annualInvestment', event.target.value)}
                    />
                </p>
                <p>
                    <label>Expected return</label>
                    <input
                        type="number"
                        value={userInput.expectedReturn}
                        required
                        name="expected_return"
                        onChange={(event) => onChange('expectedReturn', event.target.value)}
                    />
                    <label>Duration</label>
                    <input
                        type="number"
                        value={userInput.duration}
                        required
                        name="duration"
                        onChange={(event) => onChange('duration', event.target.value)}
                    />
                </p>
            </div>
        </section>

    );
}
