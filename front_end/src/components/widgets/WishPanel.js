import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import './css/header_components.scss';
import { SvgLikeFill } from './Svg';

// one of header component
export function WishPanel(props) {

    // props
    const isLite = props.isLite;

    // navigater
    const navigate = useNavigate();

    // context
    const { userWhoLogin, userWish } = useContext(Context);

    // onclick function
    const onClickNavigate = () => {
        userWhoLogin ?
            navigate(config.url_path_wishlist)
            :
            navigate(config.url_path_user_login)
    }

    return (
        isLite ?
            <div className="header_components header_components_lite cursor_pointer" onClick={onClickNavigate}>
                <SvgLikeFill />
            </div>
            :
            userWhoLogin ?
                <div className="dark_button_variant header_components cursor_pointer">
                    <SvgLikeFill />
                    <div className='space'></div>
                    <div>
                        <strong onClick={onClickNavigate}>Wish List</strong>
                    </div>
                    <div className='noti_icon'>{userWish.length}</div>
                </div>
                :
                <div className="header_components cursor_pointer">
                    <SvgLikeFill />
                    <div className='space'></div>
                    <div>
                        <strong className='hover_underline' onClick={onClickNavigate}>Wish List</strong>
                    </div>
                </div>
    );
}