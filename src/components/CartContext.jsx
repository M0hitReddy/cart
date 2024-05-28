import { createContext, useContext, useReducer } from "react";

const cartContext = createContext();

const CartProvider = ({ children }) => {
    const cartReducer = (state, action) => {
        switch (action.type) {
            case "ADD_ITEM":
                return {
                    ...state,

                    totQuantity: state.totQuantity + 1,
                    cart: state.cart.some(item => item.id === action.payload.id)
                    ? state.cart.map(item => (item.id === action.payload.id && item.quantity < 20) ? { ...item, quantity: item.quantity + 1 } : item)
                    : [...state.cart, { ...action.payload, quantity: 1 }],
                };
            case "REMOVE_ITEM":
                return {
                    ...state,
                    totQuantity: state.totQuantity - state.cart.find(item => item.id === action.payload).quantity,
                    cart: state.cart.filter((item) => item.id !== action.payload),
                };
            case "CLEAR_CART":
                return {
                    ...state,
                    cart: [],
                };
            case "INCREMENT":
                return {
                    ...state,
                    totQuantity: state.totQuantity + 1,
                    cart: state.cart.map((item) => {
                        if (item.id === action.payload) {
                            return { ...item, quantity: item.quantity + 1 };
                        }
                        return item;
                    }),
                };
            case "DECREMENT":
                return {
                    ...state,
                    totQuantity: state.totQuantity - 1,
                    cart: state.cart.map((item) => {
                        if (item.id === action.payload) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    }),
                };
                case "CHECK_ITEM":
                return {
                    ...state,
                    cart: state.cart.map((item) => (item.id === action.payload) ? { ...item, checked: !item.checked } : item)
                };
            default:
                return state;
        }
    };
    const initialState = {
        totQuantity: 0,
        cart: [],
    };

    const [cartState, cartDispatch] = useReducer(cartReducer, initialState);
    return (
        <cartContext.Provider value={{ cartState, cartDispatch }}>
            {children}
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

export default CartProvider;