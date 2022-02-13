import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from "../../contexts/Context";
import { placeOrder, syncCart, usePost } from "../../service/server_connecter";
import { callPopUp } from "../../service/ui_modifier";
import Loading from "../blocks/Loading";
import ObjectLine from "../blocks/ObjectLine";
import ContentHeader from "../widgets/ContentHeader";
import GoShopping from "../widgets/GoShopping";
import './css/cart.scss';
export default function Cart() {

    // context
    const { preFetchDone,
        userWhoLogin,
        shoppingCart,
        ShoppingCartCleanUp } = useContext(Context)

    // navigater
    const navigate = useNavigate();

    // state
    const [priceSum, setPriceSum] = useState(0)
    const [shouldPlaceOrder, setShouldPlaceOrder] = useState("");

    // fetch data
    const { done, data } = usePost(config.backend_host + 'price', Object.keys(shoppingCart), [])

    // set price sum
    useEffect(() => {
        setPriceSum(cartSum)
    }, [done, shoppingCart])

    // function to calculate price cum
    const cartSum = () => {
        console.log(data)
        try {
            var sum = 0
            for (const [key, value] of Object.entries(shoppingCart)) {
                sum += data.find(e => e._id === key).price * value
            }
            return (sum * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } catch (error) {
            return 0
        }
    }

    // function to generate order
    const generateOrder = () => {
        return {
            items: data.map((e) => {
                return { ...e, quantity: shoppingCart[e._id] }
            }),
            total: priceSum
        }
    }

    // moniter state change to place order
    useEffect(() => {
        if (shouldPlaceOrder === true) {
            placeOrder(generateOrder())
            setShouldPlaceOrder("")
            ShoppingCartCleanUp();
            syncCart({})
        }
    }, [shouldPlaceOrder])

    return (
        preFetchDone ?
            userWhoLogin ?
                done ?
                    <div className="cart">
                        <ContentHeader header="Shopping Cart" />
                        <div className="width_limit_1100" style={{ marginTop: '20px' }}>
                            {
                                Object.keys(shoppingCart).length !== 0 ?
                                    Object.keys(shoppingCart).map(e =>
                                        <ObjectLine key={e} _id={e} cartRemove={true} quantity={true} />
                                    )

                                    :
                                    <div>
                                        <h3>Your cart is empty!</h3>
                                        <GoShopping />
                                    </div>
                            }
                            {
                                Object.keys(shoppingCart).length !== 0 ?
                                    <div className="cart_submit">
                                        <h5>
                                            Total: ${priceSum}
                                        </h5>
                                        <div onClick={() => callPopUp(<h1>Place order?</h1>, true, setShouldPlaceOrder)} className='light_button cursor_pointer'>
                                            <div>
                                                Place Order
                                            </div>
                                        </div>
                                    </div> : ""
                            }



                        </div>
                    </div>
                    :
                    <Loading />
                :
                <Navigate to={config.url_path_user_login} />
            : <Loading />
    );

};
