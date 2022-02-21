import './css/header.css';
import HeaderMB from "./HeaderMB";
import HeaderPC from "./HeaderPC";

export default function Header() {
    return (
        <div id="Header">
            <div id="HeaderPC">
                <HeaderPC />
            </div>
            <div id="HeaderMB">
                <HeaderMB />
            </div>
        </div>
    )
}