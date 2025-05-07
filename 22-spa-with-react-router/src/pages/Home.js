import {Link, useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate = useNavigate();

    function navigateToProducts(){
        navigate('/products');
    }
    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to the home page! Go to <Link to="/products">a list of products</Link></p>
            <p>
                <button onClick={navigateToProducts}>Go to Products</button>
            </p>
        </div>
    );
}
