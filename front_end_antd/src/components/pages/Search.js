import { Col, Row } from "antd";
import { useParams } from "react-router-dom";
import config from '../../config/config.json';
import { useGet, useQuery } from "../../service/server_connecter";
import Loading from "../blocks/Loading";
import ObjectBox from "../blocks/ObjectBox";
import ObjectGallery from "../blocks/ObjectGallery";


export default function Search() {

    // params
    const { keyword } = useParams();

    // query
    var query = useQuery();

    // fetch data
    const { done, data } = useGet(
        keyword ?
            `${config.backend_host}search/${keyword}?${query.toString()}`
            :
            `${config.backend_host}db?${query.toString()}`
    );

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