import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import config from '../config/config.json';
import { hashPassword } from "./data_formatter";


const credential_header_post = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    credentials: "include"
}

const credential_header_get = {
    method: "GET",
    credentials: "include"
}

const common_header = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST"
}

async function userSignUp(user, callback = () => void 0, errorHandler = () => void 0) {
    user.passWord = hashPassword(user.passWord);
    await fetch(config.backend_host + config.service_user_sign_up, {
        ...credential_header_post,
        body: JSON.stringify(user)
    }).then(res => {
        if (res.status === 201) {
            // reg succeed
            callback();
        } else {
            // Invalid
            res.json().then(e => {
                errorHandler(e.msg)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

async function userLogIn(user, callback = () => void 0, errorHandler = () => void 0) {
    await fetch(config.backend_host + config.service_user_sign_in, {
        ...credential_header_post,
        body: JSON.stringify(user)
    }).then(res => {
        if (res.status === 200) {
            // Valid login
            callback();
        } else {
            // Invalid
            res.json().then(e => {
                errorHandler(e.msg)
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

async function checkIfLogin(setLoginUser, callback = () => void 0) {
    await fetch(config.backend_host + config.service_get_current_user,
        credential_header_get)
        .then(res => res.text())
        .then(e => {
            if (e) {
                setLoginUser(e);
                callback();
            } else {
                throw new Error();
            }
        })
}

async function userLogOut(callback = () => void 0) {
    await fetch(config.backend_host + config.service_user_log_out,
        credential_header_get)
        .then(() => {
            callback()
        })
}

async function syncWish(wish, setUserWish) {
    if (wish) {
        await fetch(config.backend_host + config.service_sync_wish, {
            ...credential_header_post,
            body: JSON.stringify(wish)
        }).then(res => res.text().then(e => console.log(e)))
    } else {
        await fetch(config.backend_host + config.service_get_wish,
            credential_header_get)
            .then(res => res.json())
            .then(e => setUserWish(JSON.parse(e.wish)))
            .catch(err => {
                console.log(err)
            })
    }
};

async function syncCart(cart, setShoppingCart) {
    if (cart) {
        await fetch(config.backend_host + config.service_sync_cart, {
            ...credential_header_post,
            body: JSON.stringify(cart)
        }).then(res => res.text().then(e => console.log(e)))
    } else {
        await fetch(config.backend_host + config.service_get_cart,
            credential_header_get)
            .then(res => res.json())
            .then(e => setShoppingCart(JSON.parse(e.cart)))
            .catch(err => {
                console.log(err)
            })
    }
};

async function placeOrder(order) {
    if (order) {
        await fetch(config.backend_host + config.service_add_order, {
            ...credential_header_post,
            body: JSON.stringify(order)
        }).then(res => res.text().then(e => console.log(e)))
    }
}

async function getOrder(orderId, storeOrder) {
    if (orderId) {
        await fetch(config.backend_host + config.service_get_order
            + `?_id=${orderId}`,
            credential_header_get)
            .then(res => res.json())
            .then(e => { storeOrder(e) })
            .catch(err => {
                console.log(err)
            })
    } else {
        // get user's order based on the user session store at server side
        await fetch(config.backend_host + config.service_get_order,
            credential_header_get)
            .then(res => res.json())
            .then(e => { storeOrder(e) })
            .catch(err => {
                console.log(err)
            })
    }
}

function useGet(url, watch = [url], callback = () => void 0, preFetchData) {

    const [data, setData] = useState(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (preFetchData) {
            setData(preFetchData);
            setDone(true);
            return
        } else {
            console.log(preFetchData)
            setDone(false);
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    callback(data);
                    setDone(true);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch)
    return { done, data }
}

function usePost(url, body, watch = [body], callback = () => void 0) {
    const [data, setData] = useState(null);
    const [done, setDone] = useState(false);
    useEffect(() => {
        setDone(false);
        fetch(url, {
            ...common_header,
            body: body ? JSON.stringify(body) : "{}"
        }).then(res => res.json())
            .then(data => {
                setData(data);
                callback(data)
                setDone(true);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, watch)
    return { done, data }
}

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export {
    userSignUp,
    userLogIn,
    checkIfLogin,
    userLogOut,
    syncWish,
    syncCart,
    placeOrder,
    getOrder,
    useGet,
    usePost,
    useQuery
};

