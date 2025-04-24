import { useEffect } from 'react'
import { Signinbutton, Signoutbutton } from '../../components/buttons'
import { IoMdCloudDone } from "react-icons/io";
import './index.css'

export const Popup = ({Signin, Signout, ClosePopup})=>{

    return(
        <div className='popup_main'>
            <div className='popup_box'>
                {/* close popup btn */}
                <div style={{display: 'flex', justifyContent: 'right', marginRight: '20px'}}>
                    <button id='closebtn' onClick={ClosePopup}>
                        X
                    </button>
                </div>
                <h2>Select action!</h2>

                {/* checkout or checkin buttons */}
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
                    <Signoutbutton Signout={Signout}/>
                    <Signinbutton Signin={Signin}/>
                </div>
            </div>
        </div>
    )
}




// invalide popup box
export const InvalidCardPopup = ({ ClosePopup, setCardvalidity }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            ClosePopup();
            setCardvalidity(null)
        }, 2000); // Close the popup after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [ClosePopup]);

    return (
        <div className='popup_main'>
            <div className='popup_box'>
                {/* close popup btn */}
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '20px' }}>
                    <button id='closebtn' onClick={ClosePopup}>
                        X
                    </button>
                </div>
                <h2>Invalid card</h2>
            </div>
        </div>
    )
}




// success popup box
export const SuccessPopup = ({ ClosePopup, setCardvalidity }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            ClosePopup();
            setCardvalidity(null)
        }, 2000); // Close the popup after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [ClosePopup]);

    return (
        <div className='popup_main'>
            <div className='popup_box'>
                {/* close popup btn */}
                <div style={{ display: 'flex', justifyContent: 'right', marginRight: '20px' }}>
                    <button id='closebtn' onClick={ClosePopup}>
                        X
                    </button>
                </div>
                <h2>Done </h2>
            </div>
        </div>
    );
};