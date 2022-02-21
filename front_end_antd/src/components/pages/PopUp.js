
import { useEffect } from 'react';
import { closePopUp } from '../../service/ui_modifier';
import './css/pop_up.scss';


export default function PopUp(props) {
    const isYesNo = props.isYesNo
    const setYesNo = props.setYesNo
    const text = props.text
    const isMsg = props.isMsg
    const key = new Date().getTime()
    useEffect(() => {
        if (isMsg) {
            setTimeout(() => {
                closePopUp();
            }, 1500);
        }
    }, [key])

    return (
        <div id='pop_up'>
            <div className='pop_up_box'>
                <div className='pop_up_text'>
                    {text}
                </div>
                {
                    isMsg ? "" :
                        isYesNo ?
                            <div>
                                <div className='onclick_chose light_button' onClick={() => {
                                    setYesNo(true);
                                    closePopUp()
                                }}>Yes</div>
                                <div className='onclick_chose danger_button' onClick={() => {
                                    setYesNo(false);
                                    closePopUp()
                                }}>No</div>
                            </div>
                            :
                            <div className='onclick_ok light_button' onClick={() => {
                                closePopUp()
                            }}>
                                OK
                            </div>
                }
            </div>
        </div>
    );
};
