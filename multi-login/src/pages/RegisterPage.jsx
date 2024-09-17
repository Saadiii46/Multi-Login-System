import { useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Registration = () => {

    const [ formData, setFormData ] = useState({
        username: "",
        email: "",
        schoolName: "",
        phone: "",
        password: "",
    });

    const [ errorMessage, setErrorMessage ] = useState("");
    const { username } = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/register", formData);

            if(response.data.message === "User registered successfully" ) {
                toast.success('Registration Successful');
                navigate("/");
            }
        } catch (error) {
            if(error.response && error.response.data) {
                setErrorMessage(error.response.data.message);
            }
        }
    }

    return <>
    
    <div className="flex justify-center items-center h-screen" >
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold items-center text-gray-700">Registration</h1>
            
            <form onSubmit={ handleSubmit } className="space-y-4" >
                <input type="text" name="username" placeholder="Enter username" className="input-field" value={ formData.username } 
                onChange={ handleChange } required/>
                <br />
                <input type="text" name="email" placeholder="Enter email" className="input-field" value={ formData.email } 
                onChange={ handleChange } required />
                <br />
                <input type="text" name="schoolName" placeholder="Enter School name" className="input-field" value={ formData.schoolName } 
                onChange={ handleChange } required />
                <br />
                <input type="text" name="phone" placeholder="Enter phone number" className="input-field" value={ formData.phone } 
                onChange={ handleChange } required />
                <br />
                <input type="password" name="password" placeholder="Enter password" className="input-field" value={ formData.password } 
                onChange={ handleChange } required />
                <br />
                <button type="submit" className="w-full p-2 bg-black text-white rounded-lg" >Register Now</button>
            </form>
        </div>
    </div>
    
    </>
}