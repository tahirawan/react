import logoImg from '../assets/logo.jpg';
import { use } from "react";
import CartContext from "../store/shopping-cart-context.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
    const cartCtx = use(CartContext)
    const userProgressCtx = use(UserProgressContext);

    // if you want to show only number of items
    //const cartQuantity = cartCtx.items.length;

    // if you want to show total number of items based on quantity
    const cartQuantity = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logoImg} alt="Food order app"/>
                    <h1>Muzamil Food Store</h1>
                </div>
                <nav>
                    <Button
                        onClick={handleShowCart}
                        textOnly
                    >
                        Cart ({cartQuantity})
                    </Button>
                </nav>
            </header>
        </>
    );
}
