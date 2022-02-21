import { Breadcrumb } from "antd";
import { useContext, useState } from "react";
// import { userLoginCheck } from "../../service/user";
import { useNavigate, Navigate } from "react-router-dom";
import { Context } from "../../contexts/Context";
import { checkIfLogin, syncCart, syncWish, userLogIn } from "../../service/server_connecter";
import { callLoading, closeLoading, setInnerHtml } from "../../service/ui_modifier";
import ContentHeader from "../widgets/ContentHeader";
import { SvgLock, SvgUserFill } from "../widgets/Svg";
import "./css/login.scss"


export default function Login() {

    // context
    const { setPreFetchDone,
        userWhoLogin,
        setUserWhoLogin,
        setUserWish,
        setShoppingCart } = useContext(Context)

    // state
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [loginEnable, setLoginEnable] = useState(true);

    // handle login error
    const loginErrorHandler = (msg) => {
        setInnerHtml("error_text", msg)
        setPreFetchDone(true);
        setLoginEnable(true);
        closeLoading()
    }

    // onclick function
    const onClickLogin = () => {
        if (loginEnable) {
            callLoading()
            setLoginEnable(false)
            var msg;
            if (userName === "") {
                msg = "Your username should not be empty";
            } else if (passWord === "") {
                msg = "Your password should not be empty";
            }
            if (msg) {
                setInnerHtml("error_text", msg);
                closeLoading()
                setLoginEnable(true);
                return
            }
            userLogIn({ userName: userName, passWord: passWord }, () => {
                setPreFetchDone(false);
                checkIfLogin(setUserWhoLogin)
                    .then(() => syncWish("", setUserWish))
                    .then(() => syncCart("", setShoppingCart))
                    .then(() => {
                        setPreFetchDone(true);
                        closeLoading()
                        setLoginEnable(true);
                    })
            }, loginErrorHandler)
        }
    }

    // function that monitor enter key to do search
    const enterToSubmit = (e) => {
        if (e.key === 'Enter') {
            onClickLogin();
        }
    }

    const navigate = useNavigate();

    return (
        userWhoLogin ?
            <Navigate to="/user" />
            :
            <>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">User</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">login</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="user_login">
                    <ContentHeader header={<div>Sign In</div>} />
                    <div className="width_limit_1100">
                        <div className="input_entry">
                            <h6>Username</h6>
                            <div className="input">
                                <div className="input_svg">
                                    <SvgUserFill />
                                </div>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    onKeyDown={enterToSubmit}
                                />
                            </div>
                            <h6>Password</h6>
                            <div className="input">
                                <div className="input_svg">
                                    <SvgLock />
                                </div>
                                <input
                                    type="password"
                                    value={passWord}
                                    onChange={(e) => setPassWord(e.target.value)}
                                    onKeyDown={enterToSubmit}
                                />
                            </div>
                            <div id="error_text"></div>
                            <div className="light_button" onClick={onClickLogin}>Sign In</div>
                            <a>Forgot Password</a>
                        </div>
                        <div className="sub_panel">
                            <SvgUserFill />
                            <h1>Create New Account</h1>
                            <div>Having an account enables you to save multiple addresses, add to wish list, check the status of your recent orders and more.</div>
                            <div className="grey_button" onClick={() => navigate('/reg')}>Create Account</div>
                        </div>
                    </div>
                </div>
            </>

    );
};
