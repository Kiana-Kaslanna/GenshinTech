import { Col, Row } from 'antd';
import { useGet } from '../../service/server_connecter';
import './css/object_gallery.scss';
import Loading from './Loading';
import ObjectBox from './ObjectBox';
import ObjectLine from './ObjectLine';

export default function ObjectGallery(props) {

    // props
    const url = props.url;
    const ids = props.ids;
    const org = props.org;
    const title = props.title
    const isLite = props.isLite;


    // fetch data
    const { done, data } = useGet(url, [], () => void 0, ids)

    return (
        url || (ids && ids !== []) ?
            done ?
                <div className='object_gallery width_limit_1100'>
                    {
                        title ? <div className='title'>{title}</div> : ''
                    }
                    <Row gutter={16}>
                        {
                            url ?
                                data.map((e) =>
                                    <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
                                        <ObjectBox key={e._id} data={e} />
                                    </Col>
                                )
                                :
                                data.map(e =>
                                    e === org ? void 0 :
                                        <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
                                            <ObjectBox key={e} _id={e} />
                                        </Col>
                                )
                        }
                    </Row>
                </div>
                : <Loading />
            : <div>No item</div>
    );
};
