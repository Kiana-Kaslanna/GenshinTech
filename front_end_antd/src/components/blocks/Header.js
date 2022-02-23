import { Button, Col, Dropdown, Menu, Popover, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from "../../contexts/Context";
import { changeVisibility } from "../../service/ui_modifier";
import { SearchBox } from "../widgets/SearchBox";
import { SvgCartFill, SvgLikeFill, SvgMenu, SvgSearch, SvgUserFill } from "../widgets/Svg";
import './css/header.css';
import './css/header_mb.scss';
import './css/header_pc.scss';

export default function Header(props) {
    const { preFetchData } = useContext(Context);
    const categoriesData = preFetchData.categories;
    const elementsData = preFetchData.elements;
    const artifactTypeData = preFetchData.types;
    const navigate = useNavigate();
    const [searchCallOK, setSearchCallOK] = useState(false)
    const onClickDropdownMenu = (key, value) => {
        navigate(config.url_path_search + `?${key}=${value}`)
        console.log(`${key}:${value}`)
    }
    // function

    const onClickSearchCall = () => {
        searchCallOK ?
            changeVisibility('header_mb_search', 'flex')
            :
            void 0
    }
    return (
        <div className="width_limit_1100" style={{ height: '100%' }}>
            <div id="header_pc">
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
            </div>
            <div id="header_mb">
                <Row>
                    <Col>
                        <Button type="text" onClick={props.setSiderCollapse}><SvgMenu /></Button>
                    </Col>
                    <Col>
                        <Popover
                            overlayStyle={{ width: '100vw', padding: '0' }}
                            placement="bottomLeft" content={<SearchBox isLite={true} department={categoriesData} />} trigger="click">
                            <Button type="text"><SvgSearch /></Button>
                        </Popover>

                    </Col>
                    <Col>
                        <Button type="text"><SvgUserFill /></Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}