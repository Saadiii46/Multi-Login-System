import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify';


export const Dashboard = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [activeSection, setActiveSection] = useState('staff');
    const [staffData, setStaffData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [studentFormData, setStudentFormData] = useState({ name: '', email: '', phone: '', rollNo: '' });
    const [staffFormData, setStaffFormData] = useState({ name: '', email: '', phone: '', department: '' });
    const token = localStorage.getItem('token');

    const { schoolName, username } = useParams();

    const fetchStaffData = async () => {
        try {
            const staffDataRes = await axios.get(`http://localhost:5000/dashboard/${username}/${schoolName}/staff`, { headers: { Authorization: `Bearer ${token}` } });
            setStaffData(staffDataRes.data.data);
        } catch (error) {
            console.error(error.message);
            setErrorMessage('Failed to load staff data');
        }
    };

    const fetchStudentData = async () => {
        try {
            const studentDataRes = await axios.get(`http://localhost:5000/dashboard/${username}/${schoolName}/student`, { headers: { Authorization: `Bearer ${token}` } });
            setStudentData(studentDataRes.data.studentData);
        } catch (error) {
            console.error(error.message);
            setErrorMessage('Failed to load student data');
        }
    };

    const handleDelete = async (id, type) => {
        try {
            await axios.delete(`http://localhost:5000/dashboard/${username}/${schoolName}/delete/${type}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Data deleted successfully');
            if (type === 'staff') {
                fetchStaffData();
            } else {
                fetchStudentData();
            }
        } catch (error) {
            console.error('Error deleting data:', error.message);
            alert('Error deleting data');
        }
    };

    useEffect(() => {
        if (activeSection === 'staff') {
            fetchStaffData();
        } else if (activeSection === 'student') {
            fetchStudentData();
        }
    }, [activeSection, username, schoolName, token]);

    const handleInputChange = (e, type) => {
        if (type === 'staff') {
            setStaffFormData({ ...staffFormData, [e.target.name]: e.target.value });
        } else {
            setStudentFormData({ ...studentFormData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e, type) => {
        e.preventDefault();
        const form = type === 'staff' ? staffFormData : studentFormData;

        try {
            await axios.post(`http://localhost:5000/dashboard/${username}/${schoolName}/add/${type}`, form, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Data added successfuly');
            if (type === 'staff') {
                fetchStaffData();
            } else {
                fetchStudentData();
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Error submiting data');
        }
    };

    return (
        <>
            <div className='flex h-screen'>
                <aside className='w-64 bg-gray-800 text-white flex flex-col'>
                    <h2 className='text-2xl py-4 bg-gray-900 text-center'>Dashboard</h2>
                    <nav className='space-y-4'>
                        {['staff', 'student', 'addStaff', 'addStudent'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`w-full py-2 px-4 text-left ${activeSection === section ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                            >
                                {section === 'staff' ? 'Staff Data' :
                                    section === 'student' ? 'Student Data' :
                                    section === 'addStaff' ? 'Add Staff' : 'Add Student'}
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className='flex-1 bg-gray-100 p-6'>
                    {activeSection === 'staff' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Staff Data</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/5 py-2 px-4 text-left">Name</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Email</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Phone</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Department</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {staffData.length > 0 ? (
                                            staffData.map((staff, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                                                    <td className="border px-4 py-2">{staff.name}</td>
                                                    <td className="border px-4 py-2">{staff.email}</td>
                                                    <td className="border px-4 py-2">{staff.phone}</td>
                                                    <td className="border px-4 py-2">{staff.department}</td>
                                                    <td className="border px-4 py-2">
                                                        <button onClick={() => handleDelete(staff._id, 'staff')}>
                                                            <i className="fas fa-trash text-red-500"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No staff data found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'student' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Student Data</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="w-1/5 py-2 px-4 text-left">Name</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Email</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Phone</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Roll Number</th>
                                            <th className="w-1/5 py-2 px-4 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentData.length > 0 ? (
                                            studentData.map((student, index) => (
                                                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                                                    <td className="border px-4 py-2">{student.name}</td>
                                                    <td className="border px-4 py-2">{student.email}</td>
                                                    <td className="border px-4 py-2">{student.phone}</td>
                                                    <td className="border px-4 py-2">{student.rollNo}</td>
                                                    <td className="border px-4 py-2">
                                                        <button onClick={() => handleDelete(student._id, 'student')}>
                                                            <i className="fas fa-trash text-red-500"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No student data found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeSection === 'addStaff' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Add Staff</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'staff')} className="space-y-4">
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="name"
                                    value={staffFormData.name}
                                    onChange={(e) => handleInputChange(e, 'staff')}
                                    placeholder="Name"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="email"
                                    name="email"
                                    value={staffFormData.email}
                                    onChange={(e) => handleInputChange(e, 'staff')}
                                    placeholder="Email"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="phone"
                                    value={staffFormData.phone}
                                    onChange={(e) => handleInputChange(e, 'staff')}
                                    placeholder="Phone"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="department"
                                    value={staffFormData.department}
                                    onChange={(e) => handleInputChange(e, 'staff')}
                                    placeholder="Department"
                                />
                                <button type="submit" className="block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Add Staff
                                </button>
                            </form>
                        </div>
                    )}

                    {activeSection === 'addStudent' && (
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Add Student</h2>
                            <form onSubmit={(e) => handleSubmit(e, 'student')} className="space-y-4">
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="name"
                                    value={studentFormData.name}
                                    onChange={(e) => handleInputChange(e, 'student')}
                                    placeholder="Name"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="email"
                                    name="email"
                                    value={studentFormData.email}
                                    onChange={(e) => handleInputChange(e, 'student')}
                                    placeholder="Email"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="phone"
                                    value={studentFormData.phone}
                                    onChange={(e) => handleInputChange(e, 'student')}
                                    placeholder="Phone"
                                />
                                <input
                                    className="block w-full p-2 border border-gray-300 rounded"
                                    type="text"
                                    name="rollNo"
                                    value={studentFormData.rollNo}
                                    onChange={(e) => handleInputChange(e, 'student')}
                                    placeholder="Roll Number"
                                />
                                <button type="submit" className="block w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                                    Add Student
                                </button>
                            </form>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};
