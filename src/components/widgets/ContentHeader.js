import './css/content_header.scss'

export default function ContentHeader(props) {

    // props
    const themeColor = props.themeColor
    const logo = props.logo
    const header = props.header
    const subHeader = props.subHeader

    return (
        <div className='content_header'
            style={{ backgroundColor: themeColor ? themeColor : '#fbfbfb' }}>
            <div className='width_limit_1100'>
                <div className='content_header_container'>
                    {logo ? <div>{logo}</div> : ""}
                    <div className="content_header_header">{header}</div>
                    {subHeader ? <div className="content_header_subheader">#{subHeader}</div> : ""}
                </div>
            </div>
        </div>
    );
};
