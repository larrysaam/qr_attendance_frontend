import React from 'react';
import './table.css';

const Table = ({ attendance }) => {
    return (
        <div className="table-container">
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? (
                        attendance.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.name}</td>
                                <td>{entry.checkin || 'N/A'}</td>
                                <td>{entry.checkout || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No attendance records available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;