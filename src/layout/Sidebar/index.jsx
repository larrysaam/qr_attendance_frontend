import React from 'react';
import './index.css';


const Sidebar = ({ onAttendanceClick }) => {
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
                <button className="attendance-button" onClick={onAttendanceClick}>
                    Attendance
                </button>
            </div>
        </div>
    );
};

export default Sidebar;