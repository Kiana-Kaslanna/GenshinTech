import './css/loading.scss'

export default function Loading(props) {

    // props
    const isFixed = props.isFixed

    return (
        <div className={isFixed ? 'loading loading_fixed' : 'loading'}>
            <div className="loadingio_spinner_rolling">
                <div className="ldio">
                    <div></div>
                </div>
            </div>
        </div>
    );
};
