import React, { useEffect, useState } from 'react';
import './index.css';
import { BsTextParagraph } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUsers, FaDownload } from "react-icons/fa"; // Or appropriate icons
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [activeButton, setActiveButton] = useState(null);
    const nav = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        const {pathname} = location;
        console.log(pathname);

    },[])

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'attendance') {
            nav('/'); 
        }
        else if (buttonName === 'downloads') { // Route moved to AdminLayout
            nav('/admin/downloads'); 
        }
        else if (buttonName === 'userlist') { // Route moved to AdminLayout
            nav('/admin/'); 
        }   
    };

    return (
         <div className="sidebar"> {/* Reusing 'sidebar' class */}
            <div className="logo-container">
                {/* You can have a different logo or title for admin */}
                {/* <img src="/path/to/admin-logo.png" alt="Admin Logo" className="logo" /> */}
                <h3>Admin Panel</h3>
            </div>
            <div className="button-container">
                {location.pathname.startsWith('/admin') &&
                    <div className="button-container">
                        <button className={`attendance-button ${activeButton === 'userlist' ? 'active' : ''}`} onClick={() => handleButtonClick('userlist')}>
                            <FaUsers className='navbarIcon' /> <span>User List</span>
                        </button>
                        <button className={`attendance-button ${activeButton === 'downloads' ? 'active' : ''}`} onClick={() => handleButtonClick('downloads')}>
                            <FaDownload className='navbarIcon' /> <span>Downloads</span>
                        </button>
                    </div>
                }
                {!location.pathname.startsWith('/admin') &&
                    <button
                        className={`attendance-button ${activeButton === 'attendance' ? 'active' : ''}`}
                        onClick={() => handleButtonClick('attendance')}
                    >
                        <BsTextParagraph className='navbarIcon' /> <span>Attendance</span>
                    </button>
                }
                
            </div>
        </div>
    );
};

export default Sidebar;