import { useEffect, useState } from 'react';
import { getOrder } from '../../service/server_connecter';
import { callPopUp } from '../../service/ui_modifier';
import './css/object_gallery.scss';
import Loading from './Loading';
import OrderBox from './OrderBox';

export default function OrderGallery() {

    // get order data
    const [data, setData] = useState(false);
    useEffect(() => {
        getOrder(undefined, setData);
    }, [])


    // function display order
    const onclickShowOrder = (oid, total) => {
        callPopUp(
            <div>
                <OrderBox oid={oid} priceSum={total} key={oid} />
            </div>
        );
    }

    return (
        data ?
            <div className='object_gallery width_limit_1100'>
                <div className='title'>Order</div>
                <div className="gallery">
                    <div>
                        <div className='divth'>
                            <div>OrderId</div>
                            <div>Total Price</div>
                        </div>
                    </div>
                    {
                        data.map(e => {
                            const od = JSON.parse(e.order)
                            return (
                                <div className='divtr' onClick={() => onclickShowOrder(e._id, od.total)}>
                                    <div className='divtd' >{e._id}</div>
                                    <div className='divtd' >${od.total}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            : <Loading />
    );
};
