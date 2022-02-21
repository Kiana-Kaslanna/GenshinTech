import { Card, Popover } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { memo } from 'react';
import config from '../../config/config.json';
import CartButton from '../widgets/CartButton';
import { SvgCart, SvgCartFill, SvgLike } from '../widgets/Svg';
import WishButton from '../widgets/WishButton';
import './css/object_box.scss';


function ObjectBox(props) {

    // props
    const data = props.data;

    const forwardToPage = () => {
        window.location.href = config.url_path_product + "/" + data._id
    }

    return (

        <Card className='card'
            cover={
                <img onClick={forwardToPage} className='card_cover cursor_pointer hover_rotate'
                    src={`${config.backend_host}${config.data_img_path}${data.genre}/${data._id}.png`}
                    alt='Internet Error' />
            }
            actions={[
                <SvgLike />,
                <SvgCart />
            ]}>
            <Meta
                avatar={
                    <Popover className='cursor_pointer' content={data.genre === 'character' ? data.element : 'Artifact'} trigger="hover">
                        <Avatar src={data.genre === 'character' ? `${config.backend_host}data/img/element/${data.element}.svg`
                            : null} />
                    </Popover>
                }
                title={<div className="cursor_pointer text_overflow_hidden" onClick={forwardToPage} >{data.name}</div>}
                description={<div className="text_overflow_hidden">
                    {data.genre === 'character' ? data.title : ''}
                    {data.genre === 'artifact' ? data.set : ''}
                </div>}
            />
        </Card>
    );
}


{/* <div key={data._id} className='object_box'>
            
                <h1 className='onhover_lighter cursor_pointer'>{data.name}</h1>
                {data.genre === 'character' ? <h2>{data.title}</h2> : ''}
                {data.genre === 'artifact' ? <h2>{data.set}</h2> : ''}
            </a>
            <div className='img_container'>
                <a href={config.url_path_product + "/" + data._id}>
                    <img className='cursor_pointer hover_rotate'
                        src={`${config.backend_host}${config.data_img_path}${data.genre}/${data._id}.png`}
                        alt='Internet Error' />
                </a>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '30%', textAlign: 'left', marginLeft: '10%' }}>
                    <div style={{ fontWeight: '500' }}>
                        {data.genre === 'character' ? 'Hire' : ''}
                        {data.genre === 'artifact' ? 'Buy' : ''}
                    </div>
                    <div style={{ fontSize: '10px' }}>
                        {data.genre === 'character' ? 'Price Per Day' : ''}
                        {data.genre === 'artifact' ? 'Price' : ''}
                    </div>
                </div>
                <div style={{ width: '50%', textAlign: 'right', fontWeight: '500' }}>
                    <div style={{ fontSize: '25px' }}>${data.price},000</div>
                    <div style={{ fontSize: '12px' }}>inc GST</div>
                </div>
            </div>
            <CartButton _id={data._id}>
                <div className='light_button cursor_pointer'>
                    <SvgCartFill fill='white' />
                    <div>
                        Add to Cart
                    </div>
                </div>
            </CartButton>
            <WishButton _id={data._id} isLite={true} />
        </div> */}
export default memo(ObjectBox);