import { Popupbtn, Signinbutton, Signoutbutton } from "../../components/buttons";
import { Screen } from "../../components/screen";
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import './index.css';
import axios from "axios";
import { InvalidCardPopup, Popup } from "../popup/popup";
import { Backend_URL } from "../../utils/api";

export const ScanArea = ({ option, setOption, classList, attendance, setAttendance, setVisibility, setCardvalidity }) => {
    var scanner = null; // Declare scanner variable outside useEffect to avoid reinitialization
    const [scanResults, setScanResults] = useState([]);

    // Sync offline attendance with the server when online
    useEffect(() => {
        const syncOfflineAttendance = () => {
            const storedAttendance = JSON.parse(localStorage.getItem('offlineAttendance')) || [];
            if (storedAttendance.length > 0) {
                storedAttendance.forEach(record => {
                    axios.post(`${Backend_URL}/attendance/v1`, record)
                        .then(() => {
                            console.log('Offline record synced:', record);
                        })
                        .catch(error => {
                            console.error('Error syncing offline record:', error);
                        });
                });
                localStorage.removeItem('offlineAttendance'); // Clear offline records after syncing
            }
        };

        window.addEventListener('online', syncOfflineAttendance);

        return () => {
            window.removeEventListener('online', syncOfflineAttendance);
        };
    }, []);

    // Helper function: Validate QR code format
    const validateQRCode = (results) => {
        if (results.startsWith('@')) {
            return results.slice(1); // Extract the name after '@'
        }

        alert(results);
        setCardvalidity(false);
        return null;
    };

    // Helper function: Handle valid student
    const handleValidStudent = (student, name) => {
        const currentTime = new Date().toLocaleTimeString();

        const attendie = attendance.find(entry => entry.name === name);

        if (attendie) {
            updateAttendanceLocally(name, currentTime);
            updateAttendance(name, currentTime);
        } else {
            addNewAttendanceLocally(student, currentTime);
            addNewAttendance(student, currentTime);
        }

        setCardvalidity(true);
    };

    // Helper function: Update attendance locally
    const updateAttendanceLocally = (name, currentTime) => {
        setAttendance(prevAttendance =>
            prevAttendance.map(entry =>
                entry.name === name
                    ? { ...entry, [option]: currentTime }
                    : entry
            )
        );
    };

    // Helper function: Update attendance (online or offline)
    const updateAttendance = (name, currentTime) => {
        if (navigator.onLine) {
            // If online, update the server
            axios.put(`${Backend_URL}/attendance/v1/${option}`, {
                studentname: name,
            })
            .then(() => {
                alert(`${name} has been ${option} at ${currentTime}`);
            })
            .catch(error => {
                console.error('Error updating attendance on the server:', error);
                alert('Failed to update the server. Please try again.');
            });
        } else {
            // If offline, store the record locally
            const storedAttendance = JSON.parse(localStorage.getItem('offlineAttendance')) || [];
            storedAttendance.push({ studentname: name, option });
            localStorage.setItem('offlineAttendance', JSON.stringify(storedAttendance));
            console.log('Record stored offline:', { studentname: name, option });
        }
    };

    // Helper function: Add new attendance locally
    const addNewAttendanceLocally = (student, currentTime) => {
        const newEntry = {
            name: student.name,
            [option]: currentTime,
        };
        setAttendance(prevAttendance => [...prevAttendance, newEntry]);
    };

    // Helper function: Add new attendance (online or offline)
    const addNewAttendance = (student, currentTime) => {
        if (navigator.onLine) {
            // If online, add to the server
            axios.post(`${Backend_URL}/attendance/v1`, {
                studentname: student.name,
                option
            })
            .then(() => {
                alert(`${student.name} has been ${option} at ${currentTime}`);
            })
            .catch(error => {
                console.error('Error adding attendance to the server:', error);
                alert('Failed to update the server. Please try again.');
            });
        } else {
            // If offline, store the record locally
            const storedAttendance = JSON.parse(localStorage.getItem('offlineAttendance')) || [];
            storedAttendance.push({ studentname: student.name, option });
            localStorage.setItem('offlineAttendance', JSON.stringify(storedAttendance));
            console.log('Record stored offline:', { studentname: student.name, option });
        }
    };

    // Main success function
    const success = (results) => {
        scanner.clear(); // Clear the scanner

        const name = validateQRCode(results);

        if (name) {
            const student = classList.find(student => student.name === name);

            if (student) {
                handleValidStudent(student, name);
            } else {
                alert('Name not found in class list.');
                setCardvalidity(false);
            }
        } else {
            // Show the invalid popup box
            setCardvalidity(false);
        }

        setOption(true);

        // Reopen the scanner
        scanner.render(success, error);
    };

    // Error reading QR
    const error = (err) => {
        console.warn(err);
    };

    // Initialize the scanner
    useEffect(() => {
        if (option === null) return;

        const readerElement = document.getElementById('reader');
        if (!readerElement) {
            console.error('Scanner container not found');
            return;
        }

        scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 300,
                height: 200,
            },
            fps: 5,
            disableFlip: true,
        });

        scanner.render(success, error);

        return () => {
            scanner.clear(); // Clean up the scanner on unmount
        };
    }, [option]);

    const ShowPopup = () => {
        setVisibility(true);
    };

    return (
        <div className="scan_area">
            <h2>Scan QR Here!</h2>
            <div className="scan_area_box">
                <div className="scan_area_box_inner">
                    {option === null ? '' : <Screen />}
                </div>
                <div className="buttons_container">
                    <Popupbtn action={ShowPopup} />
                </div>
            </div>
        </div>
    );
};