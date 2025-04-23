import { useState, useEffect } from 'react';
import axios from 'axios';
import './userList.css';
import { Backend_URL } from '../utils/api';
import { IoTrashBinSharp } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Fetch user list from the server
    useEffect(() => {
        axios.get(`${Backend_URL}/attendance/classlist`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user list:', error);
            });
    }, []);

    // Add a new user to the server
    const addUser = () => {
        if (!newUserName.trim()) {
            alert('Name cannot be empty');
            return;
        }

        axios.put(`${Backend_URL}/attendance/classlist`, { name: newUserName })
            .then(() => {
                alert('User added successfully');
                setUsers(prevUsers => [...prevUsers, { name: newUserName }]);
                setNewUserName('');
            })
            .catch(error => {
                console.error('Error adding user:', error);
                alert('Failed to add user');
            });
    };

    // Edit user name
    const editUser = (index) => {
        let oldName = users[index].name;
        const newName = prompt('Enter the new name:', oldName);
        if (newName && newName.trim()) {
            const updatedUsers = [...users];
            updatedUsers[index].name = newName.trim();
            setUsers(updatedUsers);

            // Update the server
            axios.patch(`${Backend_URL}/attendance/classlist`, { newName: newName.trim(), oldName })
                .then(() => {
                    alert('User updated successfully');
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                    alert('Failed to update user');
                });
        }
    };

    // Delete user
    const deleteUser = (index) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${users[index].name}?`);
        if (confirmDelete) {
            const updatedUsers = users.filter((_, i) => i !== index);
            setUsers(updatedUsers);

            // Update the server
            axios.delete(`${Backend_URL}/attendance/classlist`, { data: { name: users[index].name } })
                .then(() => {
                    alert('User deleted successfully');
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user');
                });
        }
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="user-list-container">
            <h1>Employee List</h1>
            <div className="top-bar">
                <input
                    type="text"
                    placeholder="Enter new Employee name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className='inputfield'
                />
                <button id='addUserBtn' onClick={addUser}>Add User</button>
            </div>


            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                                <button style={{background: 'none', border: 'none'}} onClick={() => editUser(index)}><MdModeEdit id='editbtn'/></button>
                                <button style={{background: 'none', border: 'none'}} onClick={() => deleteUser(index)}><IoTrashBinSharp id='deletebtn'/></button>
                            </td>
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
        </div>
    );
};