import objectOmit from "object.omit";
import { createContext, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {

    // state
    const [previousUrl, setPreviousUrl] = useState('/');
    const [preFetchDone, setPreFetchDone] = useState(false);
    const [preFetchData, setPreFetchData] = useState({});
    const [userWhoLogin, setUserWhoLogin] = useState("");
    const [userWish, setUserWish] = useState([]);
    const [shoppingCart, setShoppingCart] = useState({});

    // function to update state

    const preFetchAdd = (key, value) => {
        setPreFetchData(pre => { return { ...pre, [key]: value } })
    }

    const userWishAdd = (wish) => {
        var temp = [...userWish, wish]
        setUserWish(temp)
        return temp;
    }

    const userWishDel = (wish) => {
        var temp = userWish.filter(e => e !== wish)
        setUserWish(temp)
        return temp;
    }

    const shoppingCartIncrease = (item) => {
        if (item in shoppingCart) {
            var temp = { ...shoppingCart }
            temp[item] += 1
        } else {
            var temp = { ...shoppingCart, [item]: 1 }
        }
        setShoppingCart(temp);
        return temp;
    }

    const shoppingCartUpdate = (key, value) => {
        if (value === '0' || value === 0) {
            var temp = objectOmit(shoppingCart, key)
        } else {
            var temp = { ...shoppingCart, [key]: value }
        }
        setShoppingCart(temp)
        return temp;
    }

    // state clean up

    const ShoppingCartCleanUp = () => {
        setShoppingCart({});
    }

    const cleanUp = () => {
        setUserWhoLogin("");
        setUserWish([]);
        setShoppingCart({});
    }

    return (
        <Context.Provider value={{
            // state and setState
            previousUrl,
            setPreviousUrl,
            preFetchDone,
            setPreFetchDone,
            preFetchData,
            setPreFetchData,
            userWhoLogin,
            setUserWhoLogin,
            userWish,
            setUserWish,
            shoppingCart,
            setShoppingCart,
            // state update
            preFetchAdd,
            userWishAdd,
            userWishDel,
            shoppingCartIncrease,
            shoppingCartUpdate,
            // state clean up
            ShoppingCartCleanUp,
            cleanUp
        }}>
            {children}
        </Context.Provider>
    );
}
