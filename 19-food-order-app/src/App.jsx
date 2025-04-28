import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import {CartContextProvider} from "./store/shopping-cart-context.jsx";
import {UserProgressContextProvider} from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Checkout from "./components/Cart/Checkout.jsx";

function App() {
    return (
        <>
            <UserProgressContextProvider>
                <CartContextProvider>
                    <Header/>
                    <main>
                        <Meals/>
                        <span>
                            <Cart/>
                            <Checkout/>
                        </span>
                    </main>
                </CartContextProvider>
            </UserProgressContextProvider>
        </>
    );
}

export default App;
