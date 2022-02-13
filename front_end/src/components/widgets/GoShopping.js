import { useNavigate } from "react-router-dom";
import config from '../../config/config.json'
export default function GoShopping() {
    const navigate = useNavigate();
    return (
        <div className="light_button"
            style={{ padding: '3px 10px', width: 'fit-content', margin: 'auto', borderTop: 'none' }}
            onClick={() => navigate(config.url_path_home)}>
            Forward to Shopping
        </div>
    );
}