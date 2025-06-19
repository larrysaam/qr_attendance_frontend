import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaDownload } from "react-icons/fa"; // Or appropriate icons
import './Sidebar/index.css'; // Reusing the existing sidebar CSS for now

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const { pathname } = location;
        if (pathname === '/admin/downloads') {
            setActiveButton('downloads');
        } else if (pathname === '/admin' || pathname === '/admin/' || pathname.startsWith('/admin/userlist')) {
            // UserList is the home page for /admin and also accessible via /admin/userlist
            setActiveButton('userlist');
        } else {
            setActiveButton(null); // No specific button active or handle other admin routes
        }
    }, [location.pathname]);

    const handleButtonClick = (buttonName) => {
        // setActiveButton will be updated by the useEffect hook upon navigation
        if (buttonName === 'userlist') {
            navigate('/admin'); // User list is the home page for admin
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