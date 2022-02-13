import { useEffect, useState } from 'react';
import { getOrder } from '../../service/server_connecter';
import './css/order_box.scss';
import Loading from './Loading';
import OrderLine from './OrderLine';

export default function OrderBox(props) {

    // props
    const oid = props.oid
    const priceSum = props.priceSum
    
    // fetch order by id
    const [data, setData] = useState(false);
    useEffect(() => {
        getOrder(oid, setData);
    }, [oid])


    if (data) {
        const od = JSON.parse(data.order).items
        return (
            <div className='order_box'>
                <div className='title'>{oid}</div>
                {
                    od.map(e => <OrderLine _id={e._id} quantity={e.quantity} />)
                }
                <div className="cart_submit" style={{ width: 'auto' }}>
                    <h5>
                        Total: ${priceSum}
                    </h5>
                </div>
            </div>
        );
    } else {
        return <Loading />
    }
};
