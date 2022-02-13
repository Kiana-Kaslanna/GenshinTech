import config from '../../config/config.json';
import { useGet } from '../../service/server_connecter';
import './css/object_line.scss';

// very similar component to ObjectLine
export default function OrderLine(props) {

    // props
    const _id = props._id;
    const quantity = props.quantity

    // fetch
    const { done, data } = useGet(`${config.backend_host}id/${_id}`, [])

    return (
        done ?
            <div key={data._id} className='object_line'>
                <div className='object_line_title'>
                    <div id="object_l1" className='img_container'>
                        <a href={config.url_path_product + "/" + data._id}>
                            <img className='cursor_pointer hover_rotate'
                                src={`${config.backend_host}${config.data_img_path}${data.genre}/${data._id}.png`}
                                alt='Internet Error' />
                        </a>
                    </div>
                    <a id="object_l2" href={config.url_path_product + "/" + data._id}>
                        <h1 className='onhover_lighter cursor_pointer'>{data.name}</h1>
                    </a>
                </div>
                <div className='object_line_price' style={{ display: 'flex' }}>
                    <div>
                        <div style={{ fontSize: '25px' }}>${data.price},000</div>
                        <div style={{ fontSize: '12px' }}>inc GST</div>
                    </div>
                </div>
                <div className='object_line_helper'>
                    Quantity: {quantity}
                </div>
            </div>
            :
            <div className='object_line  object_line_loading'>
                Loading...
            </div>
    );
};
