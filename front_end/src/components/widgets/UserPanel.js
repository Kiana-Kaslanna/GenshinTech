
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import './css/header_components.scss';
import { SvgUserFill } from './Svg';

// one of header component
export function UserPanel(props) {

    // props
    const isLite = props.isLite;

    // navigater
    const navigate = useNavigate();

    // context
    const { userWhoLogin } = useContext(Context);

    // on click navigate
    const onClickNavigate = () => {
        userWhoLogin ?
            navigate(config.url_path_user)
            :
            navigate(config.url_path_user_login)
    }

    return (
        isLite ?
            <div className="header_components header_components_lite cursor_pointer">
                <SvgUserFill onClick={onClickNavigate} />
            </div>
            :
            userWhoLogin ?
                <div className="dark_button_variant header_components cursor_pointer"
                    onClick={onClickNavigate} >
                    <SvgUserFill />
                    <div className='space'></div>
                    <div>
                        <strong>{userWhoLogin}</strong>
                    </div>
                </div>
                :
                <div className="header_components cursor_pointer" >
                    <SvgUserFill />
                    <div className='space'></div>
                    <div>
                        <a onClick={() => navigate('/login')}>Sign in</a>&nbsp;or&nbsp;<a onClick={() => navigate('/reg')}>Create Account</a>
                    </div>
                </div>

    );
}