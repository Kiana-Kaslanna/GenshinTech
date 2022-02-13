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
        url || ids || ids !== [] ?
            done ?
                <div className='object_gallery width_limit_1100'>
                    <div className='title'>{title}</div>
                    <div className="gallery">
                        {
                            url ?
                                data.map(e =>
                                    e._id === org ? void 0 :
                                        isLite ?
                                            <ObjectLine key={e._id} data={e} wishRemove={props.wishRemove} />
                                            :
                                            <ObjectBox key={e._id} data={e} />)
                                :
                                data.map(e =>
                                    e === org ? void 0 :
                                        isLite ?
                                            <ObjectLine key={e} _id={e} wishRemove={props.wishRemove} />
                                            :
                                            <ObjectBox key={e} _id={e} />)

                        }
                    </div>
                </div>
                : <Loading />
            : <div>No item</div>
    );
};
