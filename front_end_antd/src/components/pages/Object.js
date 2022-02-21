import { Affix, Col, Descriptions, Row } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import config from '../../config/config.json';
import { useGet } from "../../service/server_connecter";
import Loading from "../blocks/Loading";
import ObjectGallery from "../blocks/ObjectGallery";
import CartButton from "../widgets/CartButton";
import ContentHeader from "../widgets/ContentHeader";
import WishButton from "../widgets/WishButton";
import './css/object.scss';
export default function Object() {
    // params
    const { _id } = useParams();

    // fetch data    
    const { done: mainFetchDone, data: mainFetchData } = useGet(`${config.backend_host}db?_id=${_id}`, []);
    const { done: themeColorDone, data: themeColorData } = useGet(`${config.backend_host}config/element_color.json`, []);

    if (mainFetchDone && themeColorDone) {
        const data = mainFetchData[0];
        const themeColor = themeColorData[data.element];

        // recomemdation
        switch (data.genre) {
            case 'character':
                var recomUrl = `${config.backend_host}random/6?genre=character&element=${data.element}`
                break;
            case 'artifact':
                var recomUrl = `${config.backend_host}db?genre=artifact&set=${data.set}`
                break
            default:
                var recomUrl = undefined;
        }

        return (
            <div>
                <Affix offsetTop={0}>
                    <ContentHeader

                        header={data.name}
                        subHeader={data.title}
                        logo={
                            data.genre === 'character' ?
                                <img src={`${config.backend_host}data/img/element/${data.element}.svg`}
                                    alt='Internet Error' /> : ''
                        }
                        themeColor={themeColor}

                        index={[{ name: 'product', url: '/' }, { name: data.name, url: '/product/' + data._id }]}
                    />
                </Affix>
                <div className='width_limit_1100' style={{ marginTop: 30 }}>
                    <Row gutter={[16, 16]}>
                        <Col className="product_page_component" lg={8} md={12} sm={24}>
                            <div className="img_container" style={{ backgroundColor: data.genre === 'artifact' ? themeColor : 'none' }}>
                                <img src={`${config.backend_host}data/img/${data.genre}/${data._id}.png`}
                                    alt='Internet Error'
                                />
                            </div>
                        </Col>
                        <Col className="product_page_component" lg={8} md={12} sm={24} >
                            {
                                data.genre === 'character' ?
                                    <Descriptions bordered column={1}                            >
                                        <Descriptions.Item label="Title">{data.title}</Descriptions.Item>
                                        <Descriptions.Item label="Allegiance">{data.allegiance}</Descriptions.Item>
                                        <Descriptions.Item label="Element">{data.element}</Descriptions.Item>
                                        <Descriptions.Item label="Birthday">{data.birthday}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                                    </Descriptions>
                                    : ''
                            }
                            {
                                data.genre === 'artifact' ?
                                    <Descriptions bordered column={1}                            >
                                        <Descriptions.Item label="Type">{data.type}</Descriptions.Item>
                                        <Descriptions.Item label="Artifact Set">{data.set}</Descriptions.Item>
                                        <Descriptions.Item label="Description">{data.description}</Descriptions.Item>
                                    </Descriptions>
                                    : ''
                            }
                        </Col>
                        <Col className="product_page_component" lg={8} md={12} sm={24}>
                            <Row>
                                <Col span={24}>
                                    <div style={{ textAlign: 'left', color: 'grey' }}>
                                        {data.genre === 'character' ? 'Hire Price Per Day' : ''}
                                        {data.genre === 'artifact' ? 'Genshin Tech Price' : ''}
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div style={{ fontWeight: '500', fontSize: '40px', marginTop: '20px', textAlign: 'center' }}>${data.price},000</div>
                                </Col>
                                <Col span={24}>
                                    <div className="in_stock"></div>
                                </Col>
                                <Col span={12}>
                                    <CartButton _id={data._id}>
                                        Buy Now
                                    </CartButton>
                                </Col>
                                <Col span={12}>
                                    <WishButton _id={data._id} isLite={false} />
                                </Col>

                            </Row>
                            {/* <div className="buy_panel">
                                <div style={{ textAlign: 'left', color: 'grey' }}>
                                    {data.genre === 'character' ? 'Hire Price Per Day' : ''}
                                    {data.genre === 'artifact' ? 'Genshin Tech Price' : ''}
                                </div>
                                <div style={{
                                    fontWeight: '500',
                                    fontSize: '40px',
                                    marginTop: '20px'
                                }}>${data.price},000</div>
                                <div className="in_stock"></div>
                                <CartButton _id={data._id} style={{ display: 'inline' }}>
                                    <div className="light_button">Add To Cart</div>
                                </CartButton>

                                <CartButton _id={data._id} style={{ display: 'inline' }}>
                                    <div className="light_button">Buy Now</div>
                                </CartButton>
                                <WishButton _id={data._id} isLite={false} />
                            </div> */}
                        </Col>
                    </Row>
                </div>




                <div className='width_limit_1100'>



                </div>
                {
                    data.genre === 'artifact' ?
                        <div dangerouslySetInnerHTML={{ __html: data.story }} className="story width_limit_1100">
                        </div>
                        : ''
                }
                <div className="width_limit_1100">
                    {
                        <ObjectGallery title="You may be interested..." url={recomUrl} org={data._id} />
                    }
                </div>
            </div>
        );
    } else {
        return <Loading />
    }

};
