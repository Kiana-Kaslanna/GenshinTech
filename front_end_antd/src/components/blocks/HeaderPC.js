import { Button, Col, Dropdown, Menu, Row, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import config from '../../config/config.json';
// do something with it
import { Context } from "../../contexts/Context";
import { toLowerNoSpace } from "../../service/data_formatter";
import { setClassName, visibilityOff, visibilityOn } from "../../service/ui_modifier";
import { CartPanel } from "../widgets/CartPanel";
import { GenshinTechLogo } from "../widgets/GenshinTechLogo";
import { SearchBox } from "../widgets/SearchBox";
import { SvgCartFill, SvgLikeFill, SvgMenu, SvgUserFill } from "../widgets/Svg";
import { UserPanel } from "../widgets/UserPanel";
import { WishPanel } from "../widgets/WishPanel";
import './css/header_pc.scss';

export default function HeaderPC() {

    // context
    const { preFetchData } = useContext(Context);
    const categoriesData = preFetchData.categories;
    const elementsData = preFetchData.elements;
    const artifactTypeData = preFetchData.types;

    // state
    // const [dropdownOpenId, setDropdownOpenId] = useState(0)
    // const [inProp, setInProp] = useState(false);

    const navigate = useNavigate();

    // // control the drop down call
    // // button: header_pc_ddb1
    // // content: header_pc_ddc1
    // // dropdown: header_pc_dd
    // const dropdownAction = (command, cid) => {
    //     const dropdownNum = 3;
    //     switch (command) {
    //         case 'close all':
    //             for (let i = 1; i <= dropdownNum; i++) {
    //                 visibilityOff(`header_pc_ddc${i}`);
    //                 setClassName(`header_pc_ddb${i}`, 'dark_button')
    //                 // setBackground(`header_pc_ddb${i}`, 'none')
    //             }
    //             visibilityOff('header_pc_dd');
    //             setDropdownOpenId(0)
    //             break;
    //         case 'click':
    //             if (dropdownOpenId === cid) {
    //                 console.log('close ' + cid)
    //                 // opened
    //                 visibilityOff('header_pc_dd');
    //                 setClassName(`header_pc_ddb${cid}`, 'dark_button')
    //                 // setBackground(`header_pc_ddb${cid}`, 'none')
    //                 visibilityOff(`header_pc_ddc${cid}`);
    //                 setDropdownOpenId(0)
    //             } else {
    //                 console.log('open ' + cid)
    //                 if (dropdownOpenId !== 0) {
    //                     for (let i = 1; i <= dropdownNum; i++) {
    //                         if (i !== cid) {
    //                             visibilityOff(`header_pc_ddc${i}`)
    //                         }
    //                     }
    //                     setClassName(`header_pc_ddb${dropdownOpenId}`, 'dark_button')
    //                     // setBackground(`header_pc_ddb${dropdownOpenId}`, 'none')
    //                 }
    //                 visibilityOn('header_pc_dd', 'flex');
    //                 visibilityOn(`header_pc_ddc${cid}`);
    //                 setClassName(`header_pc_ddb${cid}`, 'dark_button_active');
    //                 // setBackground(`header_pc_ddb${cid}`, style.dark_button_background_hover)
    //                 setDropdownOpenId(cid)
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // // reference
    // var viewElement;
    // const setRef = (e) => {
    //     viewElement = e;
    // }

    // // scroll event
    // useEffect(() => {
    //     var isVisible = true;
    //     const height = viewElement.getBoundingClientRect().height;
    //     console.log(height)
    //     function onScrollHandler() {
    //         dropdownAction('close all')
    //         const top = document.body.scrollTop || document.documentElement.scrollTop;
    //         var nowVisible = top < height;
    //         if (!isVisible === nowVisible) {
    //             isVisible = nowVisible;
    //             if (isVisible) {
    //                 console.log('true')
    //                 setInProp(true);
    //             } else {
    //                 console.log('false')
    //                 setInProp(false);
    //             }
    //         }
    //     }
    //     // window.addEventListener("scroll", onScrollHandler);
    // }, [])


    // // use location to detect navigation
    // const location = useLocation();
    // useEffect(() => {
    //     dropdownAction('close all');
    // }, [location]);

    // dropdown menu onclick
    const onClickDropdownMenu = (key, value) => {
        navigate(config.url_path_search + `?${key}=${value}`)
        console.log(`${key}:${value}`)
    }



    return (
        <div className="header_pc">
            <Row gutter={16}>
                <Col>
                    <Dropdown overlay={
                        <Menu style={{ width: 256 }} >
                            <SubMenu key="Characters" title="Characters">
                                {elementsData.map(e =>
                                    <Menu.Item onClick={() => onClickDropdownMenu('element', e)} key={e} style={{ width: 256 }}>{e}
                                    </Menu.Item>
                                )}
                            </SubMenu>
                            <SubMenu key="Artifacts" title="Artifacts" >
                                {artifactTypeData.map(e =>
                                    <Menu.Item onClick={() => onClickDropdownMenu('type', e)} key={e} style={{ width: 256 }}>{e}
                                    </Menu.Item>
                                )}
                            </SubMenu>
                        </Menu>
                    } placement="bottomLeft">
                        <Button><SvgMenu /></Button>
                    </Dropdown>

                </Col>
                <Col>
                    <h2>Genshin Tech</h2>
                </Col>
                <Col>
                    <SearchBox />
                </Col>
                <Col>
                    <SvgUserFill />
                </Col>
                <Col>
                    <SvgLikeFill />
                </Col>
                <Col>
                    <SvgCartFill />
                </Col>
            </Row>

            {/* <CSSTransition in={inProp} timeout={300} className='header_pc_animate'>
            <div id="header_pc_container" ref={setRef}>
                <div id="header_pc_c1">
                    <GenshinTechLogo />
                    <SearchBox isLite={false} />
                    <div>
                        <UserPanel isLite={false} />
                        <WishPanel isLite={false} />
                        <CartPanel isLite={false} />
                    </div>
                </div>
                <div id="header_pc_c2">
                    <div id="header_pc_c21">
                        <div id="header_pc_ddb1" className="dark_button" onClick={
                            () => { dropdownAction('click', 1) }}>
                            <SvgMenu />
                            <strong>Categories</strong>
                        </div>
                        <div id="header_pc_ddb2" className="dark_button" onClick={
                            () => { dropdownAction('click', 2) }}>Elements</div>
                        <div id="header_pc_ddb3" className="dark_button" onClick={
                            () => { dropdownAction('click', 3) }}>Artifact Type</div>
                        <div className="dark_button" onClick={() => navigate('/promo')} >Promotions</div>
                    </div>
                    <div id="header_pc_c22">
                        <div className="dark_button" onClick={() => navigate('/returns')}>Returns</div>
                        <div className="dark_button" onClick={() => navigate('/support')} >Help & Support</div>
                        <div className="dark_button" onClick={() => navigate('/stores')} >Stores</div>
                    </div>
                </div>
                <div id="header_pc_dd" style={{ display: 'none' }}>
                    <div id="header_pc_dd_container">
                        <div id="header_pc_ddc1" className="header_pc_ddc" style={{ display: 'none' }}>
                            {
                                categoriesData.map((e) => {
                                    return (
                                        <div onClick={() => onClickDropdownMenu('genre', toLowerNoSpace(e))} key={e}>{e}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id="header_pc_ddc2" className="header_pc_ddc" style={{ display: 'none' }}>
                            {
                                elementsData.map((e) => {
                                    return (
                                        <div onClick={() => onClickDropdownMenu('element', e)} key={e}>{e}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div id="header_pc_ddc3" className="header_pc_ddc" style={{ display: 'none' }}>
                            {
                                artifactTypeData.map((e) => {
                                    return (
                                        <div onClick={() => onClickDropdownMenu('type', e)} key={e}>{e}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div id="header_pc_dd_bg" onClick={() => { dropdownAction('close all') }}></div>
                </div>
            </div>
        </CSSTransition> */}
        </div>


    );
}
