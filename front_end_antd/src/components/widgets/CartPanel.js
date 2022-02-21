
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import './css/header_components.scss';
import { SvgCartFill } from './Svg';

// one of header component
export function CartPanel(props) {

    // props
    const isLite = props.isLite;

    // navigater
    const navigate = useNavigate();

    // context
    const { userWhoLogin, shoppingCart } = useContext(Context);

    // onclick function
    const onClickNavigate = () => {
        userWhoLogin ?
            navigate(config.url_path_cart)
            :
            navigate(config.url_path_user_login)
    }

    return (
        isLite ?
            <div onClick={onClickNavigate} className="header_components header_components_lite cursor_pointer">
                <SvgCartFill onClick={onClickNavigate} />
            </div>
            :
            <div onClick={onClickNavigate} className="dark_button_variant header_components cursor_pointer">
                <SvgCartFill />
                {
                    userWhoLogin ? <div className='noti_icon'>{Object.keys(shoppingCart).length}</div> : ""
                }
            </div>
    );
}