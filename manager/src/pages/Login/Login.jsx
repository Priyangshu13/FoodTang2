/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; 
import "./Login.css";
import { handleError, handleSuccess } from '../../utils';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return handleError('Email and password are required.');
        }

        try {
            const url = "http://localhost:4000/manager/login"; // Login endpoint
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, token, error, data } = result; // <-- Added data here

            if (success) {
                handleSuccess(message);

                // Save token
                localStorage.setItem('token', token);

                // Save user name if available
                if (data?.name) {
                    localStorage.setItem('name', data.name);
                }

                setTimeout(() => {
                    navigate('/dashboard'); // Redirect after login
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || error?.message;
                handleError(details);
            }
        } catch (error) {
            handleError(error.message || "Something went wrong");
        }
    };

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"  
                        name="email"
                        autoFocus
                        placeholder='Enter Your Email'
                        value={loginInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"  
                        name="password"
                        placeholder='Enter Your Password'
                        value={loginInfo.password}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Login;
