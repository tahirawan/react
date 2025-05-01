import Counter from './components/Counter';
import {Fragment} from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    console.log('isAuthenticated', isAuthenticated);
    return (
        <Fragment>
            <Header/>
            {/*Show Auth component if not authenticated*/}
            { !isAuthenticated && (<Auth/>) }
            {/*Show Counter component if authenticated*/}
            { isAuthenticated && (<UserProfile/>) }
            <Counter/>
        </Fragment>
    );
}

export default App;
