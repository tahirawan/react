import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
    return (
        <section className={classes.products}>
            <h2>Buy your favorite products</h2>
            <ul>
                <ProductItem
                    id='P1'
                    title='Product 1'
                    price={6}
                    description='This is a first product - amazing!'
                />
                <ProductItem
                    id='P2'
                    title='Product 2'
                    price={11}
                    description='This is a 2nd product - amazing!'
                />
            </ul>
        </section>
    );
};

export default Products;
