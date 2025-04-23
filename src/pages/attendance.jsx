import './index.css'
import { ScanArea } from '../layout/Signin'
import { useEffect, useState } from 'react'
import Table from '../components/table'
import { InvalidCardPopup, Popup, SuccessPopup } from '../layout/popup/popup'
import axios from 'axios'
import { Backend_URL } from '../utils/api'

export const Attendance = () => {

    const [option, setOption] = useState(null)
    const [visibility, setVisibility] = useState(false)
    const [cardValidity, setCardvalidity] = useState(null)
    const [attendance, setAttendance] = useState([]);
    const [classList, setClassList] = useState([]);


    // Fetch classlist data from the backend
    useEffect(() => {
        axios.get(`${Backend_URL}/attendance/classlist`) // Replace with your backend URL
            .then(response => {
                setClassList(response.data); // Store the retrieved data in classList state
            })
            .catch(error => {
                console.error('Error fetching classlist:', error);
            });
    }, []);


    useEffect(() => {
        // Fetch attendance data from the backend
        axios.get(`${Backend_URL}/attendance/v1`) // Replace with your backend URL
            .then(response => {
                setAttendance(response.data); // Store the retrieved data in attendance state
            })
            .catch(error => {
                console.error('Error fetching attendance:', error);
            });
    }, []);

    

    function Checkin() {
        setOption('checkin')
        setVisibility(false)
    }

    function Checkout() {
        setOption('checkout')
        setVisibility(false)
    }

    function ClosePopup() {
        setOption(null)
        setVisibility(false)
    }


    

    return (
        <div style={{ display: 'flex' }} className="page_attendance">
            <div className='content_area'>
                <h1>Attendance</h1>
                <div className='inner_content_area'>
                    <ScanArea classList={classList} attendance={attendance} setAttendance={setAttendance} option={option} setOption={setOption} setVisibility={setVisibility} />
                    <Table attendance={attendance} />

                    {/* option popup box */}
                    {
                        visibility === true ?
                            <Popup Signin={Checkin} Signout={Checkout} ClosePopup={ClosePopup} />
                            // <SuccessPopup ClosePopup={ClosePopup}/>
                            :
                            ''
                    }

                    {/* card validity popup box */}
                    {
                        cardValidity === false?
                            <InvalidCardPopup ClosePopup={ClosePopup} setCardvalidity={setCardvalidity}/>
                            :
                            cardValidity === true?
                                <SuccessPopup ClosePopup={ClosePopup} setCardvalidity={setCardvalidity}/>
                                :
                                ''
                    }
                </div>
            </div>
        </div>
    )
}