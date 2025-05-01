import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    console.log("cartItems", cartItems);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
        <h2>${totalPrice.toFixed(2)}{' '}</h2>
        {
            (cartItems && cartItems.length > 0) && (
              <ul>
                  { cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                  ))}
              </ul>
            )
        }
        {
            (cartItems && cartItems.length < 1) && (
                <p>Please add items into cart.</p>
            )
        }
    </Card>
  );
};

export default Cart;
