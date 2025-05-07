import {Link} from "react-router-dom";

const PRODUCTS = [
    {id: 'p1', title: 'Product 1'},
    {id: 'p2', title: 'Product 2'},
    {id: 'p3', title: 'Product 3'},
];
export default function ProductsPage(){
    return (
        <>
            <h1>The Products page</h1>
            <p>Welcome to the product page! Go to <Link to="/" > Home page</Link></p>
            <ul>
                {
                    PRODUCTS.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`} >{product.title}</Link>
                    </li>
                ))
                }
            </ul>
        </>
    );
}
