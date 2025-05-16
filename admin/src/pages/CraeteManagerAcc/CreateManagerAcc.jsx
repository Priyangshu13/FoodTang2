 
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; 
import "./CreateManagerAcc.css";
import { handleError, handleSuccess } from '../../utils2';

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '', 
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const validatePassword = (password, confirmPassword) => {
        const minLength = 8;
        const upperCase = /[A-Z]/;
        const lowerCase = /[a-z]/;
        const number = /[0-9]/;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!upperCase.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!lowerCase.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if (!number.test(password)) {
            return "Password must contain at least one number.";
        }
        if (!specialChar.test(password)) {
            return "Password must contain at least one special character.";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }

        return null; // No errors
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupInfo;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required.');
        }

        const passwordError = validatePassword(password, confirmPassword);
        if (passwordError) {
            return handleError(passwordError);
        }

        try {
            const url = "http://localhost:4000/manager/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                console.log('Redirecting to login...');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } else {
                const errorMessage = error?.details?.[0]?.message || message || "Email already exits.";
                handleError(errorMessage);
            }
        } catch (err) {
            handleError(err.message || "Something went wrong.");
        }
    };

    return (
        <div className='main'>
        <div className='container'>
            <h1>Create Manager Account</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter Your Name"
                        value={signupInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={signupInfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={signupInfo.password}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        onChange={handleChange}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Your Password"
                        value={signupInfo.confirmPassword}
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
            <ToastContainer />
        </div>
        </div>
    );
};

export default Signup;
