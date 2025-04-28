import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    updateItem: () => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.item.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({
                ...action.item,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: updatedItems
        };
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.id
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.quantity;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: [],
        };
    }

    return state;
}
export function CartContextProvider({children}) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(
        cartReducer,
        {
            items: [],
            }
        );

    function handleAddItemToCart(item) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            item: item
        });
    }

    function handleUpdateCartItemQuantity(id, quantity) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            id: id,
            quantity: quantity
        });
    }

    function handleClearCart() {
        shoppingCartDispatch({
            type: 'CLEAR_CART',
        });
    }

    const crtContext = {
        items: shoppingCartState.items,
        addItem: handleAddItemToCart,
        updateItem: handleUpdateCartItemQuantity,
        clearCart: handleClearCart,
    }

    return <CartContext value={crtContext} >
        {children}
    </CartContext>
}

export default CartContext;
