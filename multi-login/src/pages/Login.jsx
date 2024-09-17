import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [ formData, setFormData ] = useState({
        username: "",
        password: "",
        schoolName: "",
    })

    const navigate = useNavigate();

    const handleChange = async(e) => {
        // const { name, value } = e.target;
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/', formData);

            if(response.data.message === 'Login successful') {
                localStorage.setItem('token', response.data.token)
                navigate(`/dashboard/${formData.username}/${formData.schoolName}`);
                toast.success(response.data.message);
                console.log(response.data);
            }else{
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    return <>
    
    <div className="flex justify-center items-center h-screen bg-white" >
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg" >
            <h1 className="text-2xl font-bold text-center text-gray-700" >Login</h1>

            <form onSubmit={handleSubmit}  className="space-y-4">
                <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="input-field"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />
                <input 
                        type="text"
                        name="schoolName"
                        placeholder="School name"
                        className="input-field"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                        autoComplete="schoolName"
                    />
                <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input-field"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                    />
                <button type="submit" className="w-full p-2 bg-black text-white rounded-lg">
                        Login
                </button>
            </form>
            <div className="text-center mt-4">
                    <p>Don't have an account? <NavLink className={'login-navlink'} to = "/register">Register Here</NavLink>.</p>
                </div>
        </div>
    </div>
    
    </>
}