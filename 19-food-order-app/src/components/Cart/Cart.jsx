import {use} from 'react';
import CartContext from "../../store/shopping-cart-context.jsx";
import {currencyFormatter} from '../../util/formatting.js';
import Modal from "../UI/Modal.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = use(CartContext);
    const userProgressCtx = use(UserProgressContext);

    const totalPrice = cartCtx.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    function handleHideCart() {
        userProgressCtx.hideCart();
    }

    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress.cartVisible} onClose={handleHideCart}>
            <h2>Your Cart</h2>

            {cartCtx.items.length === 0 && <p>No items in cart!</p>}
            {cartCtx.items.length > 0 && (
                <ul>
                    {cartCtx.items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrease={() => cartCtx.updateItem(item.id, 1)}
                            onDecrease={() => cartCtx.updateItem(item.id, -1)}
                        />
                    ))}
                </ul>
            )}
            <p className="cart-total">
                Cart Total: <strong>{currencyFormatter.format(totalPrice)}</strong>
            </p>
            <p className="modal-actions">
                <Button textOnly onClick={handleHideCart}>Close</Button>
                { cartCtx.items.length > 0 && (
                    <Button onClick={handleShowCheckout}>Go to Checkout</Button>
                )}
            </p>

        </Modal>
    );
}
