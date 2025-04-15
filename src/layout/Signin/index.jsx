import { Popupbtn, Signinbutton, Signoutbutton } from "../../components/buttons"
import { Screen } from "../../components/screen"
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import './index.css'
import axios from "axios";
import { Popup } from "../popup/popup";
import { Backend_URL } from "../../utils/api";

export const ScanArea = ({option, setOption, classList, attendance, setAttendance, setVisibility}) => {

    var scanner = null; // Declare scanner variable outside useEffect to avoid reinitialization
    const [scanResults, setScanResults] = useState([]);
   

    function success(results) {
        scanner.clear(); // Clear the scanner
        alert(results); // Display the scanned result
    
        // Check if the scanned name exists in classList.json
        const student = classList.find(student => student.name === results);
    
        if (student) {
            // Get the current time
            const currentTime = new Date().toLocaleTimeString();
    
            // Check if the scanned name exists already in attendance list
            const attendie = attendance.find(student => student.name === results);
    
            if (attendie) {
                // Update the existing student's check-in or check-out time locally
                setAttendance(prevAttendance =>
                    prevAttendance.map(entry =>
                        entry.name === results
                            ? {
                                  ...entry,
                                  [option]: currentTime,
                              }
                            : entry
                    )
                );
    
                // Send a PUT request to update the server
                axios.put(`${Backend_URL}/attendance/v1/${option}`, {
                    studentname: results,
                    [option]: currentTime,
                })
                .then(() => {
                    alert(`${student.name} has been ${option} at ${currentTime}`);
                })
                .catch(error => {
                    console.error('Error updating attendance on the server:', error);
                    alert('Failed to update the server. Please try again.');
                });
            } else {
                // Add a new entry for the student locally
                const newEntry = {
                    name: student.name,
                    [option]: currentTime,
                };
    
                setAttendance(prevAttendance => [...prevAttendance, newEntry]);
    
                // Send a POST request to add the new entry to the server
                axios.post(`${Backend_URL}/attendance/v1`, {
                    studentname: student.name,
                    checkin: option === 'checkin' ? currentTime : 'N/A',
                    checkout: option === 'checkout' ? currentTime : 'N/A',
                })
                .then(() => {
                    alert(`${student.name} has been ${option} at ${currentTime}`);
                })
                .catch(error => {
                    console.error('Error adding attendance to the server:', error);
                    alert('Failed to update the server. Please try again.');
                });
            }
        } else {
            alert('Name not found in class list.');
        }
    
        // Reopen the scanner
        scanner.render(success, error);
    }


    // error reading QR
    function error(err) {
        console.warn(err);
    }


    // Initialize the scanner
    useEffect(() => {

        if(option === null) return 
        scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 200
            },
            fps: 5,
        });
    
        scanner.render(success, error);

    }, [option]);

   
    //sign in user
    const Signin = () => {
        // 1. set sign in option
        setOption('signin');
        // 2. open scanner
        scanner.render(success, error);
    }

    //sign out user
    const Signout = () => {
        // 1. set sign out option
        setOption('signout');
        // 2. open scanner
        scanner.render(success, error);
    }

    const ShowPopup = ()=>{
        setVisibility(true)
    }

    return(
        <div className="scan_area">
            <h2>Scan QR Here!</h2>
            <div className="scan_area_box">
                <div className="scan_area_box_inner">
                    {
                        option === null? '' : <Screen/>
                    }
                    
                </div>
                <div className="buttons_container">
                    <Popupbtn action={ShowPopup} />
                </div>
            </div>
        </div>
    );
}