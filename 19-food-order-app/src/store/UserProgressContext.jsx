import {createContext, useState} from "react";

const UserProgressContext = createContext({
    progress: null,
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

export function UserProgressContextProvider({ children }) {
    const [progress, setProgress] = useState({
        cartVisible: false,
        checkoutVisible: false,
    });

    function showCart() {
        setProgress((prevProgress) => ({
            ...prevProgress,
            checkoutVisible: false,
            cartVisible: true,
        }));
    }

    function hideCart() {
        setProgress((prevProgress) => ({
            ...prevProgress,
            cartVisible: false,
        }));
    }
    function showCheckout() {
        setProgress((prevProgress) => ({
            ...prevProgress,
            cartVisible: false,
            checkoutVisible: true,
        }));
    }
    function hideCheckout() {
        setProgress((prevProgress) => ({
            ...prevProgress,
            checkoutVisible: false,
        }));
    }
    const contextValue = {
        progress: progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return (
        <UserProgressContext value={contextValue}>
            {children}
        </UserProgressContext>
    );
}

export default UserProgressContext;
