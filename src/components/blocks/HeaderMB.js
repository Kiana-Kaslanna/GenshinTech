import { useContext, useEffect, useState } from "react";
import { Context } from "../../contexts/Context";
import { changeVisibility, visibilityOff, visibilityOn } from "../../service/ui_modifier";
import { CartPanel } from "../widgets/CartPanel";
import { GenshinTechLogo } from "../widgets/GenshinTechLogo";
import { SearchBox } from "../widgets/SearchBox";
import { SvgMenu, SvgSearch } from "../widgets/Svg";
import { UserPanel } from "../widgets/UserPanel";
import { WishPanel } from "../widgets/WishPanel";
import './css/header_mb.scss';

export default function HeaderMB() {

    // context
    const { preFetchData } = useContext(Context);
    const categoriesData = preFetchData.categories;

    // state
    const [searchCallOK, setSearchCallOK] = useState(false)

    // reference
    var viewElement;
    const setRef = (e) => {
        viewElement = e;
    }

    // scroll listener
    useEffect(() => {
        var isVisible = true;
        const height = viewElement.getBoundingClientRect().height;
        function onScrollHandler() {
            const top = document.body.scrollTop || document.documentElement.scrollTop;
            var nowVisible = top < height;
            if (!isVisible === nowVisible) {
                isVisible = nowVisible;
                if (isVisible) {
                    setSearchCallOK(false)
                    visibilityOn('header_mb_search', 'flex')

                    document.getElementById('header_mb_search_search_call').style.opacity = '0';
                } else {
                    setSearchCallOK(true)
                    visibilityOff('header_mb_search')
                    document.getElementById('header_mb_search_search_call').style.opacity = '1';
                }
            }
        }
        window.addEventListener("scroll", onScrollHandler);
    }, [])

    // function
    const onClickSearchCall = () => {
        searchCallOK ?
            changeVisibility('header_mb_search', 'flex')
            :
            void 0
    }

    return (
        <div id="header_mb_container" ref={setRef}>
            <div id="header_mb_content">
                <div>
                    <div className="header_components header_components_lite">
                        <SvgMenu />
                    </div>
                    <div id="header_mb_search_search_call"
                        className="header_components header_components_lite"
                        onClick={onClickSearchCall}>
                        <SvgSearch />
                    </div>
                    <div className="header_components header_components_lite" style={{ opacity: '0' }}>
                        <SvgMenu />
                    </div>
                </div>
                <GenshinTechLogo />
                <div>
                    <UserPanel isLite={true} />
                    <WishPanel isLite={true} />
                    <CartPanel isLite={true} />
                </div>
            </div>
            <div id="header_mb_search">
                <SearchBox isLite={true} department={["All Categories", ...categoriesData]} />
            </div>
        </div>
    );
}