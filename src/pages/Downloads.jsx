import { useState } from 'react';
import axios from 'axios';
import './downloads.css';
import { Backend_URL } from '../utils/api';

export const Downloads = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    
    const fetchAttendance = () => {
        if (!year || !month || !day) {
            alert('Please select year, month, and day.');
            return;
        }

        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const fileName = `${formattedDate}.csv`;

        axios.get(`${Backend_URL}/attendance/v1/${fileName}`)
            .then(response => {
                setAttendanceData(response.data);
                setCurrentPage(1); // Reset to the first page when new data is fetched
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                alert(`File ${fileName} does not exist.`);
                setAttendanceData([]);
            });
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

    return (
        <div className="downloads-container">
            <h1>Attendance Downloads</h1>
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

            {attendanceData.length === 0 && (
                <div className="no-data-message">No data available for the selected date.</div>
            )}
            {attendanceData.length > 0 && (
                <div className="attendance-message">Attendance data for {year}-{month}-{day}</div>
            )}
            {attendanceData.length > 0 && (
                <>
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.name}</td>
                                    <td>{row.checkin}</td>
                                    <td>{row.checkout}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};