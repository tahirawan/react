import { use, useActionState } from 'react';
import CartContext from "../../store/shopping-cart-context.jsx";
import Modal from "../UI/Modal.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import Button from "../UI/Button.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import useHttp from "../../hooks/useHttp.js";
import Error from "../Error.jsx";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
}
export default function Checkout() {
    const cartCtx = use(CartContext);
    const userProgressCtx = use(UserProgressContext);

    const {
        data,
        error,
        sendRequest,
        clearData,
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const totalPrice = cartCtx.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    async function checkoutAction(prevState, fd) {
        const formData = Object.fromEntries(fd.entries());

        console.log('Checkout formData: ', formData);

        const orderData = {
            order: {
                customer: formData,
                    items: cartCtx.items,
            },
        }

        await sendRequest(
            JSON.stringify(orderData)
        );
    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);

    let actions = (
      <>
          <Button type="button" textOnly onClick={handleClose}>Close</Button>
          <Button>Order Now</Button>
      </>
    );

    if (isSending) {
        actions = <span>Sending order...</span>;
    }

    if (data && !error) {
        return <Modal
            open={userProgressCtx.progress.checkoutVisible}
            onClose={handleFinish}
        >
            <h2>Order Successful!</h2>
            <p>Thank you for your order!</p>
            <p>
                We will get back to you as soon as possible.
            </p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okey</Button>
            </p>
        </Modal>
    }

    return (
        <Modal className="checkout" open={userProgressCtx.progress.checkoutVisible} onClose={handleClose}>
            <form action={formAction}>
                <h2>Checkout</h2>
                <p>Total amount: { currencyFormatter.format(totalPrice)}</p>
                <Input
                    label="Full Name"
                    type="text"
                    id="name"
                    required
                />
                <Input
                    label="Email"
                    type="text"
                    id="email"
                    required
                />
                <Input
                    label="Street Address"
                    type="text"
                    id="street"
                    required
                />
                <div className="control-row">
                    <Input label="Postcode" type="text" id="postcode" required></Input>
                    <Input label="City" type="text" id="city" required></Input>
                </div>

                { error && <Error title="Failed to submit order." message={error} /> }

                <p className="modal-actions">
                    { actions }
                </p>
            </form>
        </Modal>
    );
}
