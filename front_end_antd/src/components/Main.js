import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import config from '../config/config.json';
import { Context } from "../contexts/Context";
import { checkIfLogin, syncCart, syncWish, useGet } from "../service/server_connecter";
import Hdr from "./blocks/Header";
import Loading from "./blocks/Loading";
import "./main.scss";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Object from "./pages/Object";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import color from "../config/style.scss"
import Error from "./pages/Error";
import Ftr from "./blocks/Footer";
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Row, Col } from 'antd'
import { SearchBox } from "./widgets/SearchBox";

const { Header, Content, Footer } = Layout;

export default function Main() {
    const { preFetchDone,
        setPreFetchDone,
        setPreFetchData,
        setUserWhoLogin,
        setUserWish,
        setShoppingCart } = useContext(Context);

    // fetch the basic config data
    const { done } = useGet(config.backend_host + config.genshin_tech_config, [], setPreFetchData);

    // get user info every time
    useEffect(() => {
        checkIfLogin(setUserWhoLogin)
            .then(() => syncWish("", setUserWish))
            .then(() => syncCart("", setShoppingCart))
            .then(() => { setPreFetchDone(true); window.scrollTo(0, 0) })
            .catch(() => setPreFetchDone(true))
    }, []);

    return (
        done && preFetchDone ?
            <BrowserRouter>
                <div id="Main">
                    <Layout className="layout">
                        <Header>
                            <Hdr />
                        </Header>
                        <Content>
                            <div id="Body" >
                                <Routes>
                                    {/* home */}
                                    <Route exact path={config.url_path_home} element={<Home />} />
                                    {/* product */}
                                    <Route path={`${config.url_path_product}/:_id`} element={<Object />} />
                                    {/* search */}
                                    <Route path={`${config.url_path_search}/:keyword`} element={<Search />} />
                                    <Route path={`${config.url_path_search}`} element={<Search />} />
                                    {/* user */}
                                    <Route exact path={config.url_path_user_login} element={<Login />} />
                                    <Route exact path={config.url_path_user_sign_up} element={<SignUp />} />
                                    <Route path={`${config.url_path_user_home}/:keyword`} element={<User />} />
                                    <Route exact path={config.url_path_user} element={<User />} />
                                    {/* cart */}
                                    <Route exact path={config.url_path_cart} element={<Cart />} />
                                    {/* other invalid path */}
                                    <Route path="*" element={<Error />} />
                                </Routes>
                            </div>
                        </Content>
                        <Footer>
                            <Ftr />
                        </Footer>
                    </Layout>
                    {/* <Header /> */}

                    {/* <Footer /> */}
                </div>
            </BrowserRouter>
            :
            <Loading />
    );
}