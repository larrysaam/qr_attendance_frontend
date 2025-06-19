import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaDownload } from "react-icons/fa"; // Or appropriate icons
import './Sidebar/index.css'; // Reusing the existing sidebar CSS for now

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine active button based on current path
    const getActiveButton = () => {
        if (location.pathname.includes('/admin/')) {
            return 'userlist';
        }
        if (location.pathname.includes('/admin/downloads')) {
            return 'downloads';
        }
        return null; // Or a default active button for /admin index
    };

    const [activeButton, setActiveButton] = useState(getActiveButton());

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        if (buttonName === 'userlist') {
            navigate('/admin/userlist');
        } else if (buttonName === 'downloads') {
            navigate('/admin/downloads');
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
                <button className={`attendance-button ${activeButton === 'userlist' ? 'active' : ''}`} onClick={() => handleButtonClick('userlist')}>
                    <FaUsers className='navbarIcon' /> <span>User List</span>
                </button>
                <button className={`attendance-button ${activeButton === 'downloads' ? 'active' : ''}`} onClick={() => handleButtonClick('downloads')}>
                    <FaDownload className='navbarIcon' /> <span>Downloads</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;