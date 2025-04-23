import { useState } from 'react';
import axios from 'axios';
import './downloads.css';

export const Downloads = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchAttendance = () => {
        if (!year || !month || !day) {
            alert('Please select year, month, and day.');
            return;
        }

        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const fileName = `${formattedDate}.csv`;

        axios.get(`http://localhost:5000/files/${fileName}`)
            .then(response => {
                setAttendanceData(response.data);
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                alert(`File ${fileName} does not exist.`);
                setAttendanceData([]);
            });
    };

    return (
        <div className="downloads-container">
            <div className="top-bar">
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="">Year</option>
                    {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={2020 + i}>{2020 + i}</option>
                    ))}
                </select>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    <option value="">Day</option>
                    {Array.from({ length: 31 }, (_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                </select>
                <button onClick={fetchAttendance}>Fetch Attendance</button>
            </div>

            {attendanceData.length > 0 && (
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.name}</td>
                                <td>{row.checkin}</td>
                                <td>{row.checkout}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};