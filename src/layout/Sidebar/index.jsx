import React, { useState } from 'react';
import './index.css';
import { BsTextParagraph } from "react-icons/bs";
import { FaDownload } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [activeButton, setActiveButton] = useState(null);
    const nav = useNavigate();

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'attendance') {
            nav('/'); 
        }else if (buttonName === 'downloads') {
            nav('/Downloads'); 
        }
        else if (buttonName === 'userEdit') {
            nav('/UserList'); 
        }   
    };

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img 
                    src="/path/to/logo.png" 
                    alt="School Logo" 
                    className="logo" 
                />
            </div>
            <div className="button-container">
                <button
                    className={`attendance-button ${activeButton === 'attendance' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('attendance')}
                >
                    <BsTextParagraph className='navbarIcon' /> <span>Attendance</span>
                </button>
                <button
                    className={`attendance-button ${activeButton === 'downloads' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('downloads')}
                >
                    <FaDownload className='navbarIcon' /> <span>Downloads</span>
                </button>
                <button
                    className={`attendance-button ${activeButton === 'userEdit' ? 'active' : ''}`}
                    onClick={() => handleButtonClick('userEdit')}
                >
                    <FaUserEdit className='navbarIcon' /> <span>Employee</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;