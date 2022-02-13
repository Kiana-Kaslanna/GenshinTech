import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import { Context } from '../../contexts/Context';
import { toLowerNoSpace } from '../../service/data_formatter';
import './css/footer.scss';


export default function Footer() {

    // context
    const { preFetchData } = useContext(Context);
    const categoriesData = preFetchData.categories;
    const elementsData = preFetchData.elements;
    const artifactTypeData = preFetchData.types;

    const navigate = useNavigate();
    // dropdown menu onclick
    const onClickDropdownMenu = (key, value) => {
        navigate(config.url_path_search + `?${key}=${value}`)
        console.log(`${key}:${value}`)
    }

    return (
        <footer className="footer">
            <div className='footer_container'>
                <div className='footer_block'>
                    <h1>Shop by Categories</h1>
                    {
                        categoriesData.map((e) => {
                            return (
                                <div onClick={() => onClickDropdownMenu('genre', toLowerNoSpace(e))} key={e}>{e}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='footer_block'>
                    <h1>Shop by Element</h1>
                    {
                        elementsData.map((e) => {
                            return (
                                <div onClick={() => onClickDropdownMenu('element', e)} key={e}>{e}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='footer_block'>
                    <h1>Shop by Artifact Type</h1>
                    {
                        artifactTypeData.map((e) => {
                            return (
                                <div onClick={() => onClickDropdownMenu('type', e)} key={e}>{e}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='footer_block_text'>
                    This website aimed for study purpose only.
                    Thanks for the great work of Genshin Impact.
                </div>
            </div>
        </footer>
    );
}





