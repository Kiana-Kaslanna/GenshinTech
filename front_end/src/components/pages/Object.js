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
            <div className="object_page">
                <ContentHeader
                    header={data.name}
                    subHeader={data.title}
                    logo={
                        data.genre === 'character' ?
                            <img src={`${config.backend_host}data/img/element/${data.element}.svg`}
                                alt='Internet Error' /> : ''
                    }
                    themeColor={themeColor}
                />
                <div className='width_limit_1100'>
                    <div className="img_container" style={{ backgroundColor: data.genre === 'artifact' ? themeColor : 'none' }}>
                        <img src={`${config.backend_host}data/img/${data.genre}/${data._id}.png`}
                            alt='Internet Error'
                        />
                    </div>
                    {
                        data.genre === 'character' ?
                            <div className='info_table'>
                                <ul>
                                    <li>
                                        <b>Title</b>
                                        <div>{data.title}</div>

                                    </li>
                                    <li>
                                        <b>Allegiance</b>
                                        <div>{data.allegiance}</div>
                                    </li>
                                    <li>
                                        <b>Element</b>
                                        <div>{data.element}</div>
                                    </li>
                                    <li>
                                        <b>Birthday</b>
                                        <div>{data.birthday}</div>
                                    </li>
                                </ul>
                                <div style={{ width: '100%' }}>{data.description}</div>
                            </div>
                            : ''
                    }
                    {
                        data.genre === 'artifact' ?
                            <div className='info_table'>
                                <ul>
                                    <li>
                                        <b>Type</b>
                                        <div>{data.type}</div>

                                    </li>
                                    <li>
                                        <b>Artifact Set</b>
                                        <div>{data.set}</div>
                                    </li>
                                </ul>
                                <div style={{ width: '100%' }}>{data.description}</div>
                            </div>
                            : ''
                    }
                    <div className="buy_panel">
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
                    </div>
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
