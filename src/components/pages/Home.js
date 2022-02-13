import config from '../../config/config.json';
import { useGet } from '../../service/server_connecter';

import Loading from '../blocks/Loading';
import ObjectBox from '../blocks/ObjectBox';

export default function Home() {
    const { done, data } = useGet(config.backend_host + "random/20")
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