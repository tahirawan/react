import { Link } from "react-router-dom";
export default function AboutPage(){
    return (
        <div>
            <h1>About Page</h1>
            <p>Welcome to the about page! Go to <Link to="/home">Home page</Link></p>
        </div>
    );
}
