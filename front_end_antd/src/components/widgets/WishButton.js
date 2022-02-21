import { Button } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import { syncWish } from '../../service/server_connecter';
import './css/wish_button.scss';
import { SvgClose, SvgDelete, SvgLike, SvgLikeFill } from './Svg';


export default function WishButton(props) {

    // props
    const _id = props._id
    const isLite = props.isLite
    const remove = props.remove

    // context
    const {
        userWhoLogin,
        userWish,
        userWishAdd,
        userWishDel,
    } = useContext(Context);

    // state
    const [isActive, setIsActive] = useState(userWish.includes(_id));

    // navigater
    const navigate = useNavigate();

    // change the state when user wish change
    useEffect(() => {
        setIsActive(userWish.includes(props._id));
    }, [userWish])

    // function: like or dislike
    const onClickHandler = () => {
        if (userWhoLogin) {
            var temp;
            isActive ?
                temp = userWishDel(_id)
                :
                temp = userWishAdd(_id);
            syncWish(temp)
            setIsActive(pre => !pre)
        } else {
            navigate(config.url_path_user_login)
        }
    }

    // function dislike
    const onRemoveHandler = () => {
        var temp = userWishDel(props._id);
        syncWish(temp)
        setIsActive(pre => !pre)
    }

    return (
        isLite ?
            <div onClick={onClickHandler}
                className={isActive ?
                    "wish_button wish_button_active cursor_pointer" :
                    "wish_button wish_button_inactive cursor_pointer"}>
                {
                    isActive ? <SvgLikeFill /> : <SvgLike />
                }
            </div>
            :
            remove ?
                <div className='cursor_pointer danger_button' onClick={onRemoveHandler}>
                    <SvgDelete />
                    Remove
                </div>
                :
                <Button onClick={onClickHandler} style={{ width: '100%' }}>
                    {isActive ? "Remove From Wish List" : "Add To Wish List"}
                </Button>
    );
}