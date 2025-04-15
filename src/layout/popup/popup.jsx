import { Signinbutton, Signoutbutton } from '../../components/buttons'
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