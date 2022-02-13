import ReactDOM from 'react-dom';
import PopUp from '../components/pages/PopUp';



function changeVisibility(elementId, displayKeyword = 'block') {
    document.getElementById(elementId).style.display === 'none' ?
        document.getElementById(elementId).style.display = displayKeyword :
        document.getElementById(elementId).style.display = 'none'
}

function visibilityOff(elementId) {
    document.getElementById(elementId).style.display = 'none'
}

function visibilityOn(elementId, displayKeyword = 'block') {
    document.getElementById(elementId).style.display = displayKeyword
}

function setBackground(elementId, color = "rgba(0, 0, 0, 0)") {
    document.getElementById(elementId).style.backgroundColor = color;
}

function setOpacity(elementId, opacity) {
    document.getElementById(elementId).style.opacity = opacity;
}

function setInnerHtml(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

function setClassName(elementId, className) {
    document.getElementById(elementId).className = className;
}

function callPopUp(text, yesNo, setYesNo) {
    ReactDOM.render(
        <PopUp text={text} isYesNo={yesNo} setYesNo={setYesNo} />,
        document.getElementById('Msg')
    )
    visibilityOn('Msg')
}

function closePopUp() {
    visibilityOff('Msg')
}

function callMsg(text) {
    ReactDOM.render(
        <PopUp text={text} isMsg={true} />,
        document.getElementById('Msg')
    )
    visibilityOn('Msg')
}

function callLoading() {
    visibilityOn('Lod')
}

function closeLoading() {
    visibilityOff('Lod')
}


export {
    changeVisibility,
    visibilityOff,
    visibilityOn,
    setBackground,
    setOpacity,
    setInnerHtml,
    setClassName,
    callPopUp,
    closePopUp,
    callMsg,
    callLoading,
    closeLoading,
};
