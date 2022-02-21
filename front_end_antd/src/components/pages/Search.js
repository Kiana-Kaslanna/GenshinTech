import { useParams } from "react-router-dom";
import config from '../../config/config.json';
import { useGet, useQuery } from "../../service/server_connecter";
import Loading from "../blocks/Loading";
import ObjectBox from "../blocks/ObjectBox";


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
                {
                    data.map((e) =>
                        <ObjectBox key={e._id} data={e} />)
                }
            </div>
            : <Loading />
    );

}