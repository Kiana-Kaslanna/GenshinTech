import { memo, useContext } from 'react';
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import { syncCart, useGet } from '../../service/server_connecter';
import CartButton from "../widgets/CartButton";
import CartQuantity from '../widgets/CartQuantity';
import { SvgCartFill, SvgDelete } from '../widgets/Svg';
import WishButton from '../widgets/WishButton';
import './css/object_line.scss';

function ObjectLine(props) {

    // props
    const _id = props._id;
    const quantity = props.quantity
    const cartRemove = props.cartRemove
    const cartAdd = props.cartAdd
    const wishRemove = props.wishRemove

    // fetch
    const { done, data } = useGet(`${config.backend_host}id/${_id}`, [], props.data)

    // context
    const { shoppingCartUpdate, shoppingCart } = useContext(Context)

    // onclick function
    const onCartChange = (value) => {
        var temp = shoppingCartUpdate(_id, value)
        syncCart(temp)
    }

    return (
        done ?
            <div key={data._id} className='object_line'>
                <div className='object_line_title'>
                    <div id="object_l1" className='img_container'>
                        <a  href={config.url_path_product + "/" + data._id}>
                            <img className='cursor_pointer hover_rotate'
                                src={`${config.backend_host}${config.data_img_path}${data.genre}/${data._id}.png`}
                                alt='Internet Error' />
                        </a>
                    </div>
                    <a id="object_l2"  href={config.url_path_product + "/" + data._id}>
                        <h1 className='onhover_lighter cursor_pointer'>{data.name}</h1>
                    </a>
                </div>
                <div className='object_line_price' id="object_l3" style={{ display: 'flex' }}>

                    <div style={{ fontSize: '25px' }}>${data.price},000</div>
                    <div style={{ fontSize: '12px', alignSelf: 'baseline' }}>inc GST</div>

                </div>
                <div className='object_line_helper'>
                    {
                        quantity ?
                            <div style={{ display: 'flex' }}>
                                Quantity  
                                <CartQuantity
                                    num={shoppingCart[_id]}
                                    afterNumChange={onCartChange}
                                />
                            </div> : ""
                    }
                    {
                        cartRemove ?
                            <div className='danger_button cursor_pointer' onClick={() => onCartChange(0)}>
                                <SvgDelete />
                                <div>
                                    Remove
                                </div>
                            </div>
                            : ""
                    }
                    {
                        cartAdd ?
                            <CartButton _id={data._id}>
                                <div className='light_button cursor_pointer'>
                                    <SvgCartFill fill='white' />
                                    <div>
                                        Add to Cart
                                    </div>
                                </div>
                            </CartButton>
                            : ""
                    }
                    {
                        wishRemove ?
                            <WishButton _id={data._id} remove={true} />
                            : ''
                    }
                </div>
            </div>
            :
            <div className='object_line object_line_loading'>
                Loading...
            </div>
    );
};

export default ObjectLine = memo(ObjectLine)