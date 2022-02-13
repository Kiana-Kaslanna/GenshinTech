// import { userLoginCheck } from "../../service/user";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import config from "../../config/config.json";
import { Context } from "../../contexts/Context";
import { userLogOut } from "../../service/server_connecter";
import { callLoading, callPopUp, changeVisibility, closeLoading } from "../../service/ui_modifier";
import Loading from "../blocks/Loading";
import ObjectGallery from "../blocks/ObjectGallery";
import ObjectLine from "../blocks/ObjectLine";
import OrderGallery from "../blocks/OrderGallery";
import ContentHeader from "../widgets/ContentHeader";
import GoShopping from "../widgets/GoShopping";
import { SvgMenu } from "../widgets/Svg";
import "./css/user.scss";

export default function User() {

    // params
    var { keyword } = useParams();
    keyword ??= 'wishlist';

    // context
    const { preFetchDone, userWhoLogin, cleanUp, userWish, shoppingCart } = useContext(Context);

    // navigater
    const navigate = useNavigate();

    const [shouldLogOut, setShouldLogOut] = useState("");


    const onCallAccountMenu = () => {
        const menuNum = 5;
        for (let i = 2; i <= menuNum; i++) {
            changeVisibility(`user_home_cc${i}`)
        }
    }

    useEffect(() => {
        if (shouldLogOut === true) {
            callLoading();
            userLogOut(() => {
                cleanUp();
                navigate('/login');
            }).then(() => closeLoading())
        }
    }, [shouldLogOut])

    const onClickLogOut = () => {
        callPopUp(<h1>Sure to log out?</h1>, true, setShouldLogOut);
    }

    return (
        preFetchDone ?
            userWhoLogin ?
                <div className="user_home">
                    <ContentHeader header={<div>Hello, {userWhoLogin}</div>} />
                    <div className="width_limit_1100">
                        <div className="vertical_menu">
                            <div id="user_home_cc1" onClick={onCallAccountMenu}>
                                <SvgMenu />
                                Account Menu</div>
                            <div id="user_home_cc2" className={keyword === 'wishlist' ? 'user_home_cc_active' : 'user_home_cc'}
                                onClick={() => navigate('/user/wishlist')}
                            >Wishlist</div>
                            <div id="user_home_cc3" className={keyword === 'orders' ? 'user_home_cc_active' : 'user_home_cc'}
                                onClick={() => navigate('/user/orders')}
                            >Orders</div>
                            <div id="user_home_cc4" className={keyword === 'settings' ? 'user_home_cc_active' : 'user_home_cc'}
                                onClick={() => navigate('/user/settings')}
                            >Settings</div>
                            <div id="user_home_cc5" onClick={onClickLogOut} className='user_home_cc'>Sign Out</div>
                        </div>
                        {
                            keyword === 'wishlist' ?
                                userWish.length === 0 ?
                                    <div className="user_home_content_page">
                                        <div className='title'>You have no wishes!</div>
                                        <GoShopping />
                                    </div>

                                    :
                                    <div className="user_home_content_page">
                                        <div className='title'>Your Wishes</div>
                                        {
                                            userWish.map(e =>
                                                <ObjectLine key={e} _id={e} wishRemove={true} cartAdd={true} />
                                            )
                                        }
                                    </div>
                                : ''
                        }
                        {
                            keyword === 'orders' ?
                                <div className="user_home_content_page">
                                    <OrderGallery url={config.backend_host + 'byids'} title="Orders" bodyData={userWish} isLite={true} wishRemove={true} />
                                </div>
                                : ''
                        }
                        {
                            keyword === 'settings' ?
                                <div className="user_home_content_page">
                                    <h3>This page does not exist</h3>
                                </div>
                                : ''
                        }
                    </div>
                </div>
                :
                <Navigate to={config.url_path_user_login}/>
            : <Loading />
    );
};