import { Breadcrumb, PageHeader } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './css/content_header.scss'


export default function ContentHeader(props) {

    // props
    const themeColor = props.themeColor
    const logo = props.logo
    const header = props.header
    const subHeader = props.subHeader
    const index = props.index ? props.index : []
    console.log(index)
    return (
        <div className='content_header'>
            <div className=' width_limit_1100'>
                <PageHeader
                    title={header}
                    subHeader={subHeader}
                    breadcrumb={
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to='/'>Home</Link>
                            </Breadcrumb.Item>
                            {
                                index.map(obj =>
                                    obj ?
                                        <Breadcrumb.Item key={obj.url}>
                                            <Link to={obj.url}>{obj.name}</Link>
                                        </Breadcrumb.Item> : ''
                                )
                            }
                        </Breadcrumb>
                    }>
                </PageHeader>
            </div>
        </div>

    );
};

{/* <div className='content_header'
            style={{ backgroundColor: themeColor ? themeColor : '#fbfbfb' }}>
            <div className='width_limit_1100'>
                <div className='content_header_container'>
                    {logo ? <div>{logo}</div> : ""}
                    <div className="content_header_header">{header}</div>
                    {subHeader ? <div className="content_header_subheader">#{subHeader}</div> : ""}
                </div>
            </div>
        </div> */}
