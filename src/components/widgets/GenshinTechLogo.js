import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import logo from '../../static/img/png/genshin_tech_logo.png';

export function GenshinTechLogo() {

    // navigater
    const navigate = useNavigate();

    // onclick function
    const onClickNavigate = () => {
        navigate(config.url_path_home)
    }

    return (
        <div className="genshin_tech_logo cursor_pointer"
            onClick={onClickNavigate}>
            <img src={logo} alt="Genshin Tech" height={40}/>
        </div>
    );
}
