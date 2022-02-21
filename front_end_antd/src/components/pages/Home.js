import { Col, Row } from 'antd';
import config from '../../config/config.json';
import { useGet } from '../../service/server_connecter';

import Loading from '../blocks/Loading';
import ObjectBox from '../blocks/ObjectBox';

export default function Home() {
    const { done, data } = useGet(config.backend_host + "random/20")
    return (
        done ?
            <div className='width_limit_1100'>
                <Row gutter={16}>
                    {
                        data.map((e) =>
                            <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={24}>
                                <ObjectBox key={e._id} data={e} />
                            </Col>
                        )
                    }
                </Row>
            </div>
            : <Loading />
    );
}