import { Input, Select } from "antd";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import './css/search_box.scss';
import { SvgSearch } from "./Svg";

export function SearchBox(props) {

    // navigater
    const navigate = useNavigate();

    // props
    const isLite = props.isLite;
    const department = props.department;

    // state
    const [searchInput, setSearchInput] = useState("");
    const [searchGenre, setSearchGenre] = useState("")

    // disable the on press enter event on .select
    // useEffect(() => {
    //     const selection = document.querySelector('.select');
    //     selection.addEventListener('keydown', (e) => {
    //         if (e.keyCode == 13) {
    //             e.preventDefault();
    //             return false
    //         }
    //     })
    // })

    // function to search
    const doSearch = () => {
        if (searchInput) {
            if (searchGenre === "") {
                navigate(config.url_path_search + `/${searchInput}`)
            } else {
                navigate(config.url_path_search + `/${searchInput}?genre=${searchGenre}`)
            }
        }
    }

    // function that monitor enter key to do search
    const enterToSearch = (e) => {
        if (e.key === 'Enter') {
            doSearch();
        }
    }

    return (
        isLite ?
            <Input.Group>
                <Select defaultValue="all">
                    <Option value="all">All Categories</Option>
                    {
                        department.map((v, i) => {
                            return (
                                <Option key={v} value={v.toLowerCase()}>
                                    {v}
                                </Option>
                            );
                        })
                    }
                </Select>
                <Input.Search style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />

            </Input.Group>
            // <Search
            //     style={{ width: 200 }}
            //     value={searchInput}
            //     onChange={(e) => setSearchInput(e.target.value)}
            //     placeholder="input search text"
            //     onSearch={doSearch}
            //     enterButton />
            // <div className='search_box search_box_lite'>
            //     <SvgSearch className="cursor_pointer" onClick={doSearch} />
            //     <div className="input_select">
            //         <input
            //             type="text"
            //             value={searchInput}
            //             onChange={(e) => setSearchInput(e.target.value)}
            //             onKeyDown={enterToSearch}
            //         />
            //         <select className="select"
            //             value={searchGenre}
            //             onChange={(e) => setSearchGenre(e.target.value)}
            //             onKeyDown={enterToSearch}>
            //             {
            //                 department.map((v, i) => {
            //                     return (
            //                         <option key={v} value={i === 0 ? "" : v.toLowerCase()}>
            //                             {v}
            //                         </option>
            //                     );
            //                 })
            //             }
            //         </select>
            //     </div>

            // </div>
            :
            <Search
                style={{ width: 200 }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="input search text"
                onSearch={doSearch}
                enterButton />
        // <div className='search_box'>
        //     <input
        //         type="text"
        //         value={searchInput}
        //         onChange={(e) => setSearchInput(e.target.value)}
        //         onKeyDown={enterToSearch}
        //     />
        //     <div onClick={doSearch} className="search_call light_button">
        //         <SvgSearch />
        //     </div>
        // </div>
    );
}