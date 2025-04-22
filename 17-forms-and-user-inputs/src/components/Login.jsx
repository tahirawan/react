import {useRef, useState} from "react";

export default function Login() {
    const [emailIsInValid, setEmailIsInValid] = useState(false);

    const email = useRef();
    const password = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const enteredValues = {
            email: email.current.value,
            password: password.current.value
        };
        console.log(enteredValues);

        const emailIsValid = enteredValues.email.includes('@');

        if (!emailIsValid) {
            setEmailIsInValid(true);
            return;
        }

        setEmailIsInValid(false);

        console.log('submitted');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        ref={email}
                    />

                    { emailIsInValid && (
                        <div className="control-error">
                            Please enter a valid email address.
                        </div>
                    )}
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        ref={password}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
