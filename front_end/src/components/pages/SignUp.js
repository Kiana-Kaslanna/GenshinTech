import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../../contexts/Context";
import { checkIfLogin, userSignUp } from "../../service/server_connecter";
import { callLoading, closeLoading, setInnerHtml } from "../../service/ui_modifier";
import ContentHeader from "../widgets/ContentHeader";
import { SvgEdit, SvgLock, SvgUserFill } from "../widgets/Svg";
import "./css/login.scss";

export default function SignUp() {

    // context
    const { setPreFetchDone, userWhoLogin, setUserWhoLogin } = useContext(Context)

    // state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [signUpEnable, setSignUpEnable] = useState(true);

    // navigater
    const navigate = useNavigate();

    // handle sign up error
    const signUpErrorHandler = (msg) => {
        setInnerHtml("error_text", msg)
        setSignUpEnable(true);
        closeLoading()
    }

    // onclick function
    const onClickSignUp = () => {
        if (signUpEnable) {
            callLoading()
            setSignUpEnable(false);
            var msg;
            if (firstName === "" || lastName === "") {
                msg = "Your name should not be empty";
            } else if (/[^a-zA-Z1-9$]/.test(userName)) {
                console.log(userName)
                console.log(typeof (userName))
                msg = "Your username should contain only letters and numbers."
            } else if (userName.length < 6) {
                msg = "Your username should have at least 6 characters."
            } else if (passWord.length < 8) {
                msg = "Your password should have at least 8 characters."
            }
            if (msg) {
                setInnerHtml("error_text", msg);
                setSignUpEnable(true);
                closeLoading()
                return
            }
            userSignUp({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord
            }, () => {
                checkIfLogin(setUserWhoLogin, () => {
                    setPreFetchDone(true);
                    closeLoading()
                    setSignUpEnable(true);
                });
            }, signUpErrorHandler)
        }
    }

    // function that monitor enter key to do search
    const enterToSubmit = (e) => {
        if (e.key === 'Enter') {
            onClickSignUp();
        }
    }

    return (
        userWhoLogin ?
            <Navigate to="/user" />
            :
            <div className="user_login">
                <ContentHeader header="Create Account" />
                <div className="width_limit_1100">
                    <div className="input_entry">
                        <h6>First Name</h6>
                        <div className="input">
                            <div className="input_svg">
                                <SvgEdit />
                            </div>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyDown={enterToSubmit}
                            />
                        </div>
                        <h6>Last Name</h6>
                        <div className="input">
                            <div className="input_svg">
                                <SvgEdit />
                            </div>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={enterToSubmit}
                            />
                        </div>
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
                        <div className="light_button" onClick={onClickSignUp}>Register</div>
                    </div>
                    <div className="sub_panel">
                        <SvgLock />
                        <h1>Secure Order Process</h1>
                        <div>Using the bcrypt encryption technology to protect your information.</div>
                        <h1>Already Registered?</h1>
                        <div className="grey_button" onClick={() => navigate('/login')}>Sign in now</div>
                    </div>
                </div>
            </div>
    );
};
