import { useContext } from "react";
import { Context } from "../../contexts/Context";
import { syncCart } from "../../service/server_connecter";
import { callMsg } from "../../service/ui_modifier";


export default function CartButton(props) {

    // props
    const _id = props._id

    // context
    const { userWhoLogin, shoppingCartIncrease } = useContext(Context)

    // onclick function
    const onClickCartIncrease = () => {
        if (userWhoLogin) {
            var temp = shoppingCartIncrease(_id);
            syncCart(temp);
            callMsg(<h1>Added to cart!</h1>)
        }
    }

    return (
        <div onClick={onClickCartIncrease} style={{...props.style}}>
            {props.children}
        </div>
    );
};
