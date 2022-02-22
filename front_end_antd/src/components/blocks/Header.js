import './css/header.css';
import HeaderMB from "./HeaderMB";
import HeaderPC from "./HeaderPC";

export default function Header() {
    return (
        <div style={{ height: '100%' }}>
            <div id="HeaderPC">
                <HeaderPC />
            </div>
            <div id="HeaderMB">
                <HeaderMB />
            </div>
        </div>
    )
}