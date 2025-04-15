import './index.css'
import { ScanArea } from '../layout/Signin'
import { useEffect, useState } from 'react'
import Table from '../components/table'
import Sidebar from '../layout/Sidebar'
import { Popup } from '../layout/popup/popup'
import axios from 'axios'

export const Page = () => {

    const [option, setOption] = useState(null)
    const [visibility, setVisibility] = useState(false)
    const [attendance, setAttendance] = useState([
        { "name": "John Doe", "checkin": "08:00 AM", "checkout": "03:00 PM" },
        { "name": "Jane Smith", "checkin": "08:15 AM", "checkout": "03:10 PM" }
    ]);
    const [classList, setClassList] = useState([]);


    useEffect(() => {
        // Fetch classlist data from the backend
        axios.get('http://localhost:5000/attendance/classlist') // Replace with your backend URL
            .then(response => {
                setClassList(response.data); // Store the retrieved data in classList state
            })
            .catch(error => {
                console.error('Error fetching classlist:', error);
            });
    }, []);


    useEffect(() => {
        // Fetch attendance data from the backend
        axios.get('http://localhost:5000/attendance/v1') // Replace with your backend URL
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
            <Sidebar />
            <div className='content_area'>
                <h1>Attendance</h1>
                <div className='inner_content_area'>
                    <ScanArea classList={classList} attendance={attendance} setAttendance={setAttendance} option={option} setOption={setOption} setVisibility={setVisibility} />
                    <Table attendance={attendance} />

                    {/* popup box */}
                    {
                        visibility === true ?
                            <Popup Signin={Checkin} Signout={Checkout} ClosePopup={ClosePopup} />
                            :
                            ''
                    }
                </div>
            </div>
        </div>
    )
}